import {ProfileSection} from "./(home)/ProfileSection/ProfileSection"
import {ContactSection} from "./(home)/ContactSection/ContactSection"
import {RoleSection} from "./(home)/RoleSection/RoleSection"
import {SkillSection} from "./(home)/SkillSection/SkillSection"
import {ExperienceSection} from "./(home)/ExperienceSection/ExperienceSection"

export default function HomePage() {
  return (
    <main className="flex flex-col gap-12">
      <ProfileSection />
      <RoleSection />
      <ContactSection />
      <SkillSection />
      <ExperienceSection />
    </main>
  )
}
