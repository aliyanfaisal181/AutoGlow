import ChoiceCard from '../ui/ChoiceCard'
import StepHeading, { FieldError } from './StepHeading'
import { packages, currency } from '../../data/packages'

export default function PackageStep({ value, onChange, error }) {
  return (
    <fieldset data-invalid={!!error}>
      <StepHeading number={1}>Choose a package</StepHeading>
      <div className="grid gap-3 sm:grid-cols-3">
        {packages.map((p) => (
          <ChoiceCard
            key={p.id}
            name="package"
            value={p.id}
            checked={value === p.id}
            onChange={() => onChange(p.id)}
            className="p-5"
          >
            <span className="block font-display text-2xl font-semibold">{p.name}</span>
            <span className="mt-1 block text-lg font-bold text-ember">{currency}{p.price}</span>
            <span className="mt-1 block text-sm text-steel">{p.duration}</span>
          </ChoiceCard>
        ))}
      </div>
      <FieldError message={error} />
    </fieldset>
  )
}