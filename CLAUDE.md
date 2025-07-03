# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IntelDrop Static Site is a single-page landing page designed to drive iOS app downloads. Built with zero build tools for maximum simplicity and instant development feedback.

## Core Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern features (Grid, Flexbox, custom properties)
- **Vanilla JavaScript**: No frameworks, pure ES6+ features
- **Tailwind CSS**: Utility-first CSS via CDN (no build process)

## Development Commands

Since this is a zero-build-tools project, no npm scripts are needed:

```bash
# Serve locally (any simple HTTP server)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000

# Open in browser
open http://localhost:8000
```

## File Structure

```
/
├── index.html          # Main landing page
├── styles.css          # Custom brand styles (supplement to Tailwind)
├── script.js           # Vanilla JS interactions and analytics
├── CLAUDE.md          # This file
└── assets/            # Images, icons, app screenshots
    ├── logo.svg
    ├── hero-mockup.png
    ├── screenshot-*.png
    ├── app-store-badge.svg
    └── favicon.ico
```

## Key Architecture Decisions

**Zero Build Tools**: Intentionally avoids webpack, npm scripts, or any build process. Files are served directly for instant development feedback.

**Tailwind via CDN**: Uses Tailwind's CDN with custom configuration for brand colors. No compilation needed.

**Mobile-First Design**: Built with mobile-first responsive design principles, as 83% of landing page traffic is mobile.

**Performance-Optimized**: 
- Lazy loading images
- Intersection Observer for animations
- Preloading critical resources
- Debounced scroll handlers

## Styling Approach

- **Tailwind utilities**: Primary styling method
- **Custom CSS**: Brand-specific styles and animations in `styles.css`
- **CSS Custom Properties**: For theme colors and reusable values
- **Modern CSS**: Uses Grid, Flexbox, backdrop-filter for iOS-like effects

## JavaScript Features

- **Intersection Observer**: For scroll-triggered animations
- **Smooth Scrolling**: Native scroll behavior with fallback
- **Analytics Tracking**: Event tracking for user interactions
- **Accessibility**: Keyboard navigation and ARIA labels
- **Performance**: Image lazy loading and resource preloading

## Content Strategy

Landing page follows proven conversion patterns:
- Hero section with clear value proposition
- Feature highlights with icons
- Social proof (testimonials and ratings)
- Multiple App Store CTAs
- Mobile-optimized design

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 14.0+
- No IE support (uses modern CSS and JS features)

## Development Guidelines

**Adding New Sections**: Follow the existing pattern of semantic HTML with Tailwind classes and custom CSS animations.

**Performance**: Keep images optimized and use lazy loading for any new media.

**Accessibility**: Maintain semantic HTML, proper heading hierarchy, and keyboard navigation support.

**Analytics**: Use the `trackEvent()` function for new user interactions.

## Asset Requirements

The `assets/` directory should contain:
- App screenshots (3 main screens)
- App Store badges (regular and white versions)
- Logo variations (regular and white)
- Hero mockup image
- User avatars for testimonials
- Favicon and touch icons

## Deployment

Since this is a static site, it can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

No build process required - upload files directly.

## Future Enhancements

If build tools become necessary:
- Add image optimization pipeline
- Implement critical CSS inlining
- Add service worker for offline functionality
- Consider TypeScript for JavaScript enhancement

## Testing

Test the site by:
1. Opening `index.html` in a browser
2. Testing responsive design at different screen sizes
3. Verifying all links and interactions work
4. Checking performance with browser dev tools
5. Testing accessibility with screen readers