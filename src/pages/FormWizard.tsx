import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, ChevronRight, ChevronLeft, User, MapPin, Sliders, ClipboardList } from 'lucide-react'

const step1Schema = z.object({
  firstName: z.string().min(2, 'At least 2 characters'),
  lastName: z.string().min(2, 'At least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'At least 7 digits'),
})

const step2Schema = z.object({
  street: z.string().min(5, 'At least 5 characters'),
  city: z.string().min(2, 'At least 2 characters'),
  country: z.string().min(2, 'Select a country'),
  postal: z.string().min(4, 'At least 4 characters'),
})

const step3Schema = z.object({
  occupation: z.string().min(2, 'At least 2 characters'),
  bio: z.string().max(200, 'Max 200 characters').optional(),
  newsletter: z.boolean(),
})

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema)
type FormData = z.infer<typeof fullSchema>

const stepFields: (keyof FormData)[][] = [
  ['firstName', 'lastName', 'email', 'phone'],
  ['street', 'city', 'country', 'postal'],
  ['occupation', 'bio', 'newsletter'],
]

const steps = [
  { label: 'Personal', icon: User },
  { label: 'Address', icon: MapPin },
  { label: 'Preferences', icon: Sliders },
  { label: 'Review', icon: ClipboardList },
]

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors'

export default function FormWizard() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '',
      street: '', city: '', country: '', postal: '',
      occupation: '', bio: '', newsletter: false,
    },
    mode: 'onTouched',
  })

  const { register, formState: { errors }, trigger, getValues, handleSubmit } = form

  const next = async () => {
    if (step < 3) {
      const fields = stepFields[step] as (keyof FormData)[]
      const valid = await trigger(fields)
      if (valid) setStep((s) => s + 1)
    }
  }

  const prev = () => setStep((s) => s - 1)

  const onSubmit = () => setSubmitted(true)

  if (submitted) {
    const data = getValues()
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Form Submitted!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          All steps validated with react-hook-form + Zod.
        </p>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 text-left space-y-2">
          {Object.entries(data).map(([k, v]) => (
            <div key={k} className="flex gap-2 text-sm">
              <span className="font-medium text-slate-500 dark:text-slate-400 capitalize w-28 shrink-0">{k}:</span>
              <span className="text-slate-900 dark:text-slate-100">{String(v)}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => { setSubmitted(false); setStep(0); form.reset() }}
          className="mt-6 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-xl transition-colors"
        >
          Start Over
        </button>
      </div>
    )
  }

  const data = getValues()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Multi-step Form</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">react-hook-form + Zod · 4 steps · per-step validation</p>
      </div>

      <div className="flex items-center gap-0">
        {steps.map(({ label, icon: Icon }, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={[
                'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all',
                i < step ? 'bg-violet-600 border-violet-600' :
                i === step ? 'bg-white dark:bg-slate-800 border-violet-600' :
                'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600',
              ].join(' ')}>
                {i < step
                  ? <Check size={14} className="text-white" />
                  : <Icon size={14} className={i === step ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'} />
                }
              </div>
              <span className={`text-xs mt-1 font-medium ${i === step ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${i < step ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" error={errors.firstName?.message}>
                  <input {...register('firstName')} placeholder="Alice" className={inputClass} />
                </Field>
                <Field label="Last name" error={errors.lastName?.message}>
                  <input {...register('lastName')} placeholder="Smith" className={inputClass} />
                </Field>
              </div>
              <Field label="Email" error={errors.email?.message}>
                <input {...register('email')} type="email" placeholder="alice@example.com" className={inputClass} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <input {...register('phone')} placeholder="+1 555 000 0000" className={inputClass} />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Address Details</h2>
              <Field label="Street address" error={errors.street?.message}>
                <input {...register('street')} placeholder="123 Main Street" className={inputClass} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" error={errors.city?.message}>
                  <input {...register('city')} placeholder="Ho Chi Minh City" className={inputClass} />
                </Field>
                <Field label="Postal code" error={errors.postal?.message}>
                  <input {...register('postal')} placeholder="700000" className={inputClass} />
                </Field>
              </div>
              <Field label="Country" error={errors.country?.message}>
                <select {...register('country')} className={inputClass}>
                  <option value="">Select country…</option>
                  <option value="VN">Vietnam</option>
                  <option value="US">United States</option>
                  <option value="JP">Japan</option>
                  <option value="SG">Singapore</option>
                  <option value="AU">Australia</option>
                </select>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Preferences</h2>
              <Field label="Occupation" error={errors.occupation?.message}>
                <input {...register('occupation')} placeholder="Frontend Developer" className={inputClass} />
              </Field>
              <Field label="Bio (optional)" error={errors.bio?.message}>
                <textarea
                  {...register('bio')}
                  placeholder="Tell us a little about yourself…"
                  rows={3}
                  className={inputClass + ' resize-none'}
                />
              </Field>
              <label className="flex items-center gap-3 cursor-pointer">
                <input {...register('newsletter')} type="checkbox" className="w-4 h-4 accent-violet-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Subscribe to newsletter</span>
              </label>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Review & Submit</h2>
              {[
                { heading: 'Personal', fields: [['First name', data.firstName], ['Last name', data.lastName], ['Email', data.email], ['Phone', data.phone]] },
                { heading: 'Address', fields: [['Street', data.street], ['City', data.city], ['Country', data.country], ['Postal', data.postal]] },
                { heading: 'Preferences', fields: [['Occupation', data.occupation], ['Bio', data.bio ?? '—'], ['Newsletter', data.newsletter ? 'Yes' : 'No']] },
              ].map(({ heading, fields }) => (
                <div key={heading} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wide mb-2">{heading}</p>
                  {fields.map(([label, value]) => (
                    <div key={label} className="flex gap-2 text-sm py-0.5">
                      <span className="text-slate-500 dark:text-slate-400 w-28 shrink-0">{label}</span>
                      <span className="text-slate-900 dark:text-slate-100 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
            >
              <Check size={16} /> Submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
