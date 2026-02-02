'use client'

import { useEffect, useState, type ChangeEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle2, Loader2, LogOut } from 'lucide-react'
import { clsx } from 'clsx'
import { supabase } from '@/lib/supabaseClient'
import { useSupabaseSession } from '@/hooks/use-supabase-session'

type ProfileForm = {
  full_name: string
  phone: string
  address_line1: string
  city: string
  province: string
  postal_code: string
  country: string
  address_note: string
}

const EMPTY_PROFILE: ProfileForm = {
  full_name: '',
  phone: '',
  address_line1: '',
  city: '',
  province: '',
  postal_code: '',
  country: 'Indonesia',
  address_note: '',
}

const formatDate = (value?: string | null) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-semibold uppercase tracking-wide text-neutral-500">
      {children}
    </label>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useSupabaseSession()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [formData, setFormData] = useState<ProfileForm>(EMPTY_PROFILE)
  const [isProfileLoading, setIsProfileLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const provider =
    user?.app_metadata?.provider ||
    (Array.isArray(user?.app_metadata?.providers)
      ? user?.app_metadata?.providers[0]
      : null) ||
    'email'

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const handleChange =
    (key: keyof ProfileForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, [key]: value }))
      setProfileError(null)
      setSaveMessage(null)
    }

  useEffect(() => {
    if (!user) {
      setFormData(EMPTY_PROFILE)
      setIsProfileLoading(false)
      setProfileError(null)
      setSaveMessage(null)
      return
    }

    let isMounted = true
    setIsProfileLoading(true)
    setProfileError(null)

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(
          'full_name, phone, address_line1, city, province, postal_code, country, address_note'
        )
        .eq('id', user.id)
        .maybeSingle()

      if (!isMounted) return

      if (error) {
        setProfileError(error.message || 'Failed to load profile data.')
        setIsProfileLoading(false)
        return
      }

      if (data) {
        setFormData({
          full_name: data.full_name ?? '',
          phone: data.phone ?? '',
          address_line1: data.address_line1 ?? '',
          city: data.city ?? '',
          province: data.province ?? '',
          postal_code: data.postal_code ?? '',
          country: data.country ?? 'Indonesia',
          address_note: data.address_note ?? '',
        })
      } else {
        setFormData(EMPTY_PROFILE)
      }

      setIsProfileLoading(false)
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [user?.id])

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) return

    setProfileError(null)
    setSaveMessage(null)

    const payload: ProfileForm = {
      full_name: formData.full_name.trim(),
      phone: formData.phone.trim(),
      address_line1: formData.address_line1.trim(),
      city: formData.city.trim(),
      province: formData.province.trim(),
      postal_code: formData.postal_code.trim(),
      country: formData.country.trim(),
      address_note: formData.address_note.trim(),
    }

    const requiredFields: Array<{ key: keyof ProfileForm; label: string }> = [
      { key: 'full_name', label: 'Full Name' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'address_line1', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'province', label: 'Province/State' },
      { key: 'postal_code', label: 'Postal Code' },
      { key: 'country', label: 'Country' },
    ]

    for (const field of requiredFields) {
      if (!payload[field.key]) {
        setProfileError(`${field.label} is required.`)
        return
      }
    }

    setIsSaving(true)
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      ...payload,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      setProfileError(error.message || 'Failed to save profile.')
    } else {
      setSaveMessage('Profile updated successfully.')
    }

    setIsSaving(false)
  }

  return (
    <section className="relative w-full bg-[#f5f4f2] py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
            Account
          </p>
          <h1 className="mt-4 text-3xl font-light tracking-tight text-neutral-900 md:text-4xl">
            Your Profile
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            View your account details and manage access.
          </p>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-10 shadow-[0_8px_25px_rgba(0,0,0,0.03)]">
          {isLoading ? (
            <div className="flex items-center justify-center gap-3 text-sm text-neutral-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading profile...</span>
            </div>
          ) : user ? (
            <div className="space-y-10">
              <div className="grid gap-6 text-sm text-neutral-700">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="uppercase tracking-[0.2em] text-neutral-400">
                    Email
                  </span>
                  <span className="font-medium text-neutral-900">
                    {user.email ?? '-'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="uppercase tracking-[0.2em] text-neutral-400">
                    User ID
                  </span>
                  <span className="font-medium text-neutral-900">{user.id}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="uppercase tracking-[0.2em] text-neutral-400">
                    Provider
                  </span>
                  <span className="font-medium text-neutral-900">{provider}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                  <span className="uppercase tracking-[0.2em] text-neutral-400">
                    Created At
                  </span>
                  <span className="font-medium text-neutral-900">
                    {formatDate(user.created_at)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="uppercase tracking-[0.2em] text-neutral-400">
                    Last Login
                  </span>
                  <span className="font-medium text-neutral-900">
                    {formatDate(user.last_sign_in_at)}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                  Shipping Information
                </h2>

                {isProfileLoading ? (
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading shipping data...</span>
                  </div>
                ) : (
                  <form onSubmit={handleSave} className="grid gap-8">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <FieldLabel>Full Name</FieldLabel>
                        <input
                          name="full_name"
                          type="text"
                          placeholder="Recipient Name"
                          value={formData.full_name}
                          onChange={handleChange('full_name')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                      <div>
                        <FieldLabel>Phone Number</FieldLabel>
                        <input
                          name="phone"
                          type="tel"
                          placeholder="08xxxxxxxxxx"
                          value={formData.phone}
                          onChange={handleChange('phone')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <FieldLabel>Address</FieldLabel>
                      <textarea
                        name="address_line1"
                        rows={3}
                        placeholder="Street, House number, etc."
                        value={formData.address_line1}
                        onChange={handleChange('address_line1')}
                        disabled={isSaving}
                        className="w-full resize-none appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                      />
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                      <div>
                        <FieldLabel>City</FieldLabel>
                        <input
                          name="city"
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange('city')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                      <div>
                        <FieldLabel>Province/State</FieldLabel>
                        <input
                          name="province"
                          type="text"
                          placeholder="Province/State"
                          value={formData.province}
                          onChange={handleChange('province')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                      <div>
                        <FieldLabel>Postal Code</FieldLabel>
                        <input
                          name="postal_code"
                          type="text"
                          placeholder="Postal Code"
                          value={formData.postal_code}
                          onChange={handleChange('postal_code')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <FieldLabel>Country</FieldLabel>
                        <input
                          name="country"
                          type="text"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleChange('country')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                      <div>
                        <FieldLabel>Address Note</FieldLabel>
                        <input
                          name="address_note"
                          type="text"
                          placeholder="Landmarks, floor, or other details"
                          value={formData.address_note}
                          onChange={handleChange('address_note')}
                          disabled={isSaving}
                          className="w-full appearance-none border-b border-neutral-300 bg-transparent py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-800 focus:bg-transparent disabled:bg-transparent"
                        />
                      </div>
                    </div>

                    {profileError && (
                      <div className="text-sm text-red-600">{profileError}</div>
                    )}
                    {saveMessage && (
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{saveMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={clsx(
                        'mt-2 flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wide transition',
                        'bg-neutral-900 text-white hover:bg-neutral-800',
                        isSaving && 'cursor-not-allowed opacity-70'
                      )}
                    >
                      {isSaving ? (
                        <>
                          <span>Saving...</span>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <span>Save Changes</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={clsx(
                  'flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wide transition',
                  'bg-neutral-900 text-white hover:bg-neutral-800',
                  isSigningOut && 'cursor-not-allowed opacity-70'
                )}
              >
                {isSigningOut ? (
                  <>
                    <span>Processing...</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-sm text-neutral-600">
                You are not logged in. Please login or create an account to continue.
              </p>
              <div className="flex flex-col items-center gap-3">
                <Link
                  href="/login"
                  className="w-full rounded-full border border-neutral-300 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-neutral-900 hover:border-neutral-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full rounded-full bg-neutral-900 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white hover:bg-neutral-800"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
