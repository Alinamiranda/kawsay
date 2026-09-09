import {
  Scale,
  HeartPulse,
  GraduationCap,
  Building2,
  HandHeart,
  FileText,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  scale: Scale,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  'hand-heart': HandHeart,
  'file-text': FileText,
}

export function CategoryIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = map[name] ?? FileText
  return <Icon className={className} aria-hidden="true" />
}
