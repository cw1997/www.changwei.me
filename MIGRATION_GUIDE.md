# TypeScript to ReScript Migration Guide

## Project Status

This document outlines the migration progress and provides guidance for completing the TypeScript to ReScript migration for www.changwei.me.

## Completed (9/32 files - 28%)

### Bindings Created
- ✅ Ant Design components (Space, Divider, Button, Dropdown, ConfigProvider, Tag, Image, Timeline, Typography, Card, List, Row, Col)
- ✅ Ant Design Icons (MenuOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, CameraOutlined, GithubOutlined, CodeOutlined, and 11 more)
- ✅ Next.js (Link, Image, Script, usePathname, useRouter, useSearchParams, Metadata types)
- ✅ Vercel Analytics and Speed Insights
- ✅ Ant Design Next.js Registry
- ✅ Day.js with plugins

### Files Migrated
1. ✅ `src/data.ts` → `src/Data.res`
2. ✅ `src/app/friendly-link/data.ts` → `src/app/friendly-link/FriendlyLinkData.res`
3. ✅ `src/components/OutsideLink.tsx` → `src/components/OutsideLink.res`
4. ✅ `src/app/loading.tsx` → `src/app/Loading.res`
5. ✅ `src/app/(home)/ProfileSection/Now.tsx` → `src/app/(home)/ProfileSection/Now.res`
6. ✅ `src/components/Header/HeaderMenu.tsx` → `src/components/Header/HeaderMenu.res`
7. ✅ `src/components/Header/Header.tsx` → `src/components/Header/Header.res`
8. ✅ `src/components/Footer/Footer.tsx` → `src/components/Footer/Footer.res`
9. ✅ Infrastructure setup (rescript.json, .gitignore)

## Remaining Files (23/32 files)

### High Priority (Application Core)
- `src/app/layout.tsx` - Root layout with metadata, fonts, providers
- `src/app/page.tsx` - Home page component
- `src/app/global-error.tsx` - Error boundary

### Home Page Sections (Large Components)
- `src/app/(home)/ProfileSection/ProfileSection.tsx` (305 lines)
- `src/app/(home)/ContactSection/ContactSection.tsx` (377 lines)
- `src/app/(home)/RoleSection/RoleSection.tsx` (173 lines) - **IN PROGRESS**
- `src/app/(home)/SkillSection/SkillSection.tsx` (312 lines)
- `src/app/(home)/ExperienceSection/ExperienceSection.tsx` (485 lines)

### Page Routes
- `src/app/resume/layout.tsx`
- `src/app/resume/page.tsx`
- `src/app/portfolio/layout.tsx`
- `src/app/portfolio/page.tsx`
- `src/app/guestbook/layout.tsx`
- `src/app/guestbook/page.tsx`
- `src/app/friendly-link/layout.tsx`
- `src/app/friendly-link/page.tsx`
- `src/app/sentry-example-page/page.tsx`

### API Routes
- `src/app/api/changwei-resume.pdf/route.ts`
- `src/app/api/sentry-example-api/route.ts`

### Configuration Files
- `src/instrumentation.ts`
- `instrumentation-client.ts`
- `next.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

## Migration Patterns

### Basic Component
```rescript
@react.component
let make = () => {
  let styles = %raw(`require("./Component.module.sass")`)
  
  <div className={styles["container"]}>
    {React.string("Hello")}
  </div>
}
```

### Client Component
```rescript
%%raw(`"use client"`)

@react.component
let make = () => {
  let (state, setState) = React.useState(() => initialValue)
  // ... rest of component
}
```

### Using External Libraries
```rescript
// Import through bindings
<Antd.Space align="center">
  <AntdIcons.MenuOutlined />
  <Next.Link href="/">
    {React.string("Home")}
  </Next.Link>
</Antd.Space>
```

### Handling Styles
```rescript
// For CSS modules
let styles = %raw(`require("./styles.module.sass")`)
<div className={styles["className"]} />

// For inline styles
let style = %raw(`{fontSize: 24, color: "#333"}`)
<div style={style} />
```

### Image Imports
```rescript
let logoImage = %raw(`require("@/assets/images/logo.svg")`)
<Next.Image src={logoImage["src"]} width={48} height={48} alt="" />
```

## Key Challenges

### 1. Library Bindings
Most JavaScript/TypeScript libraries don't have ReScript bindings. You need to create them manually using `@module` and `@react.component` externals.

### 2. Next.js 16 App Router
Limited ReScript support for Next.js 16 features:
- Metadata API
- Server Components
- API Routes
- Font loaders

Workaround: Use `%raw` for complex Next.js features.

### 3. TypeScript Metadata
ReScript doesn't have direct equivalent for TypeScript's `Metadata` type. You may need to:
- Keep some config files in JS/TS
- Use `%raw` extensively
- Create comprehensive type bindings

### 4. CSS Modules
ReScript doesn't have built-in CSS module support. Use `%raw` to require them.

### 5. Complex React Patterns
- Render props
- Higher-order components
- Context with complex types

## Recommendations

### Option 1: Complete Full Migration
Continue migrating all 32 files following the established patterns. Estimate: 2-3 days of focused work.

**Pros:**
- Pure ReScript codebase
- Type safety
- Better maintainability

**Cons:**
- Very time-consuming
- Extensive binding creation needed
- Some features may not work perfectly

### Option 2: Hybrid Approach
Keep configuration files and complex Next.js-specific files in TypeScript, migrate only React components.

**Pros:**
- Less work
- Avoid compatibility issues
- Maintain existing functionality

**Cons:**
- Mixed codebase
- Less type safety in TS files

### Option 3: Gradual Migration
Migrate incrementally, starting with new features while keeping existing code in TypeScript.

## Next Steps

1. **Complete RoleSection** - Add remaining data and migrate
2. **Migrate src/app/page.tsx** - Depends on home sections
3. **Migrate home sections** - ProfileSection, ContactSection, SkillSection, ExperienceSection
4. **Migrate src/app/layout.tsx** - Critical for application structure
5. **Migrate remaining pages** - Resume, Portfolio, Guestbook, Friendly Link
6. **Handle configuration files** - May need to keep as JS/TS
7. **Delete original TypeScript files**
8. **Update package.json** - Add ReScript build to scripts
9. **Test thoroughly**

## Build Commands

```bash
# Build ReScript
npx rescript build

# Watch mode
npx rescript build -w

# Clean
npx rescript clean

# Build Next.js (will include compiled ReScript)
npm run build
```

## Testing Strategy

1. Build ReScript: `npx rescript build`
2. Build Next.js: `npm run build`
3. Run development server: `npm run dev`
4. Test each page manually
5. Check browser console for errors
6. Verify all functionality works

## Conclusion

The migration is 28% complete with solid infrastructure in place. The remaining work is primarily translating React components following established patterns. The biggest challenge is the sheer volume of code (1,672 lines in home sections alone) and creating bindings for all external libraries.

Consider whether a complete migration to ReScript is the best approach for this project, or if a hybrid approach would be more practical.
