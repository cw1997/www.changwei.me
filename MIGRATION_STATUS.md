# TypeScript to ReScript Migration Status

## Overview
This document tracks the progress of migrating www.changwei.me from TypeScript to ReScript.

## Completed Work

### 1. Infrastructure Setup ✅
- [x] Installed ReScript dependencies (`rescript`, `@rescript/react`, `@rescript/core`)
- [x] Created `rescript.json` configuration
- [x] Updated `.gitignore` to exclude ReScript build artifacts (`lib/bs`, `lib/ocaml`)
- [x] Added ReScript build scripts to `package.json`
- [x] Verified ReScript compilation pipeline works

### 2. Bindings Created ✅
Created ReScript bindings for external JavaScript/TypeScript libraries:

#### Next.js Bindings (`src/bindings/Next.res`)
- Link component
- Image component
- Script component
- Font.Google (Noto_Sans_SC)

#### Ant Design Bindings (`src/bindings/Antd.res`)
- Space
- Divider
- Tag
- Button
- Image
- Typography (Text, Link)
- Tooltip
- Popover
- QRCode
- Row
- Col
- Dropdown
- ConfigProvider
- AntdRegistry

#### Ant Design Icons Bindings (`src/bindings/AntdIcons.res`)
- MailOutlined
- EnvironmentOutlined
- ClockCircleOutlined
- CameraOutlined
- GithubOutlined
- LinkedinOutlined
- WechatOutlined
- MenuOutlined
- HomeOutlined
- FileTextOutlined
- LinkOutlined
- MessageOutlined
- FolderOpenOutlined

#### Day.js Bindings (`src/bindings/Dayjs.res`)
- Basic dayjs API
- format function
- timezone support
- UTC plugin support

### 3. Files Converted ✅
Successfully converted the following TypeScript files to ReScript:

1. **src/data.ts** → **src/Data.res**
   - URL constants for resume PDFs

2. **src/components/OutsideLink.tsx** → **src/components/OutsideLink.res**
   - Reusable link component with default target="_blank"

3. **src/app/friendly-link/data.ts** → **src/app/friendly-link/FriendlyLinkData.res**
   - Friendly links data structure

4. **src/app/(home)/ProfileSection/Now.tsx** → **src/app/(home)/ProfileSection/Now.res**
   - Real-time clock component using dayjs

## Remaining Work

### Critical Missing Bindings

#### 1. FontAwesome Bindings (High Priority)
Need bindings for:
- `@fortawesome/react-fontawesome` (FontAwesomeIcon component)
- `@fortawesome/free-brands-svg-icons` (50+ brand icons)
- `@fortawesome/free-solid-svg-icons` (100+ solid icons)
- `@fortawesome/free-regular-svg-icons` (Regular icons)

Estimated: 200-300 lines of binding code

#### 2. Sentry Bindings (Medium Priority)
- `@sentry/nextjs` configuration
- Sentry initialization
- Error boundary integration
- Performance monitoring

Estimated: 100-200 lines of binding code

#### 3. Vercel Bindings (Low Priority)
- `@vercel/analytics`
- `@vercel/speed-insights`

Estimated: 50 lines of binding code

#### 4. Giscus Bindings (Low Priority)
- `@giscus/react` comment system

Estimated: 50 lines of binding code

#### 5. Next.js Advanced APIs
- Metadata API (for SEO)
- Route Handler API (for API routes)
- generateStaticParams
- App Router specific types

Estimated: 200-300 lines of binding code

### Files Requiring Conversion (27 files remaining)

#### Configuration Files (5 files)
- [ ] next.config.ts (complex Sentry integration)
- [ ] sentry.server.config.ts
- [ ] sentry.edge.config.ts  
- [ ] src/instrumentation.ts
- [ ] instrumentation-client.ts

#### Component Files (13 files)
- [ ] src/components/Header/Header.tsx
- [ ] src/components/Header/HeaderMenu.tsx
- [ ] src/components/Footer/Footer.tsx
- [ ] src/app/(home)/ProfileSection/ProfileSection.tsx (300+ lines)
- [ ] src/app/(home)/ContactSection/ContactSection.tsx
- [ ] src/app/(home)/RoleSection/RoleSection.tsx
- [ ] src/app/(home)/SkillSection/SkillSection.tsx
- [ ] src/app/(home)/ExperienceSection/ExperienceSection.tsx
- [ ] src/app/loading.tsx
- [ ] src/app/global-error.tsx
- [ ] src/app/sentry-example-page/page.tsx

#### Page Components (7 files)
- [ ] src/app/page.tsx
- [ ] src/app/layout.tsx (critical - includes Metadata)
- [ ] src/app/friendly-link/page.tsx
- [ ] src/app/guestbook/page.tsx
- [ ] src/app/portfolio/page.tsx
- [ ] src/app/resume/page.tsx

#### Layout Components (4 files)
- [ ] src/app/friendly-link/layout.tsx
- [ ] src/app/guestbook/layout.tsx
- [ ] src/app/portfolio/layout.tsx
- [ ] src/app/resume/layout.tsx

#### API Routes (2 files)
- [ ] src/app/api/changwei-resume.pdf/route.ts
- [ ] src/app/api/sentry-example-api/route.ts

### TypeScript Files to Delete
After conversion is complete, delete all 31 original TypeScript files:
- All `.ts` files (9 files)
- All `.tsx` files (22 files)

## Technical Challenges

### 1. Next.js App Router Compatibility
**Challenge**: Next.js App Router relies on file-based routing with special file names:
- `page.tsx` - Page components
- `layout.tsx` - Layout wrappers
- `route.ts` - API route handlers
- `loading.tsx`, `error.tsx`, `global-error.tsx` - Special components

**Impact**: ReScript modules may need special configuration to work with Next.js conventions.

**Solution**: Use `.res.js` output with proper naming conventions.

### 2. Metadata API
**Challenge**: Next.js exports metadata objects for SEO:
```typescript
export const metadata: Metadata = { ... }
```

**Impact**: Need bindings for Metadata type and proper export syntax in ReScript.

**Status**: Binding not yet created.

### 3. Complex Type Mappings
**Challenge**: Some TypeScript features don't map directly to ReScript:
- Union types (e.g., `bool | React.element`)
- Advanced generic types
- Conditional types

**Solution**: Use ReScript's type system alternatives or `any` type where necessary.

### 4. Build Integration
**Challenge**: Dual compilation pipeline:
1. ReScript → JavaScript (`.res` → `.res.js`)
2. Next.js → Production bundle

**Status**: Configured in package.json, but needs testing.

### 5. External Library Updates
**Challenge**: When external libraries update, bindings must be manually updated.

**Impact**: Increased maintenance burden compared to TypeScript.

## Estimated Remaining Effort

### Binding Creation
- FontAwesome: 4-6 hours
- Sentry: 3-4 hours
- Vercel/Giscus: 1-2 hours
- Next.js Advanced: 4-6 hours
- **Total: 12-18 hours**

### File Conversions
- Configuration files: 4-6 hours
- Component files: 16-24 hours
- Page/Layout files: 8-12 hours
- API routes: 2-4 hours
- **Total: 30-46 hours**

### Testing & Debugging
- Build integration: 4-6 hours
- Feature testing: 8-12 hours
- Bug fixes: 8-16 hours
- **Total: 20-34 hours**

### **Grand Total: 62-98 hours (1.5-2.5 weeks full-time)**

## Recommendations

### ⚠️ Critical Considerations

1. **Ecosystem Mismatch**: ReScript is not in Next.js's primary ecosystem. Most documentation and examples use TypeScript.

2. **Maintenance Burden**: Every external library update requires binding updates.

3. **Team Knowledge**: Team members need to learn ReScript syntax and tooling.

4. **Debugging Complexity**: Errors may occur in generated JavaScript, making debugging harder.

5. **Community Support**: Limited Next.js + ReScript community compared to Next.js + TypeScript.

### Alternative Approach

Consider keeping TypeScript and achieving similar benefits through:
- Stricter TypeScript configuration
- Better linting rules
- Functional programming patterns in TypeScript
- Type-safe wrappers around external libraries

### If Proceeding with Migration

Priority order for remaining work:
1. Complete critical bindings (FontAwesome, Sentry)
2. Convert layout.tsx and page.tsx in src/app/
3. Convert remaining components
4. Convert configuration files
5. Extensive testing
6. Delete TypeScript files

## Current Status Summary

- **Files Converted**: 4 of 31 (13%)
- **Bindings Created**: 4 libraries (partial coverage)
- **Infrastructure**: Complete
- **Testing**: Minimal
- **Production Ready**: No

## Files Generated

### ReScript Source Files (.res)
- src/Data.res
- src/components/OutsideLink.res
- src/app/friendly-link/FriendlyLinkData.res
- src/app/(home)/ProfileSection/Now.res
- src/bindings/Next.res
- src/bindings/Antd.res
- src/bindings/AntdIcons.res
- src/bindings/Dayjs.res

### Generated JavaScript Files (.res.js)
All corresponding `.res.js` files are automatically generated by ReScript compiler in-source.

## Build Commands

```bash
# Build ReScript files
npm run res:build

# Watch mode for development
npm run res:watch

# Clean build artifacts
npm run res:clean

# Development server (with ReScript compilation)
npm run dev

# Production build (with ReScript compilation)
npm run build
```

## Notes

- ReScript compilation is now integrated into `dev` and `build` scripts
- `.res.js` files are generated in-source (same directory as `.res` files)
- Build artifacts in `lib/` directory are excluded from git
- Both `.ts` and `.res` files currently coexist (migration in progress)
