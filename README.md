# 3D Profile Portfolio

A futuristic immersive 3D personal portfolio website.

This project is being built step by step with GitHub branches so each stage can be reviewed before moving forward.

## Build plan

1. Project foundation and setup
2. Basic portfolio layout
3. 3D scene foundation
4. Cinematic scroll journey
5. Skills and project holograms
6. Polish, performance, and responsive finishing
7. Final testing and deployment

## Local development

```bash
npm install
npm run dev
```

## Quality goals

- Readable profile content first
- Lightweight 3D layer loaded separately from the main page
- WebGL fallback for unsupported browsers
- Reduced-motion support
- Mobile-friendly responsive layout

## Production checks

```bash
npm run lint
npm run build
```

The Three.js vendor bundle is intentionally separated from the main app bundle so the normal page shell can load before the immersive 3D layer.

The build also creates the small server entry required by the Sites production host.
