---
name: DevFocus Dark
colors:
  primary: "#2665fd"
  secondary: "#475569"
  surface: "#0b1326"
  on-surface: "#dae2fd"
  error: "#ffb4ab"
typography:
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
rounded:
  md: 8px
---

# DevFocus Dark Design System

## Overview

A focused, minimal dark interface for a developer productivity tool. Clean lines, low visual noise, and high information density.

## Colors

- **Primary (`#2665fd`)**: CTAs, active states, and key interactive elements
- **Secondary (`#475569`)**: Supporting UI, chips, borders, and secondary actions
- **Surface (`#0b1326`)**: Page backgrounds
- **On-surface (`#dae2fd`)**: Primary text on dark backgrounds
- **Error (`#ffb4ab`)**: Validation errors and destructive actions

## Typography

- **Headlines**: Inter, semi-bold
- **Body**: Inter, regular, 14–16px
- **Labels**: Inter, medium, 12px, uppercase for section headers

## Components

- **Buttons**: 8px rounded corners; primary actions use the brand-blue fill
- **Inputs**: 1px border with a subtle surface-variant background
- **Cards**: No elevation; use border and background contrast

## Do's and Don'ts

- Do use the primary color sparingly, only for the most important action.
- Don't mix rounded and sharp corners in the same view.
- Do maintain at least a 4:1 contrast ratio for all text.

## Portfolio implementation notes

- Keep the interface dark by default and avoid decorative gradients that compete with the content.
- Use one corner radius token (`8px`) for interactive controls and content surfaces.
- Reserve blue for the main CTA, active navigation, focus states, and small status indicators.
- Use secondary slate for borders, chips, and non-critical controls.
