# Spot the Difference Game - Configuration Guide

## Image Files Used

- **Game Image**: `/public/dimension/image1.png` (with differences)
- **Reference Image**: `/public/dimension/image2.png` (original)

## How to Adjust Difference Positions

The difference positions are defined in `/pages/dimension/index.js` using percentage coordinates (0.0 to 1.0):

```javascript
const differences = [
  { id: 1, x: 0.25, y: 0.35, radius: 30, description: "Upper left detail" },
  { id: 2, x: 0.5, y: 0.6, radius: 35, description: "Center area change" },
  { id: 3, x: 0.75, y: 0.4, radius: 28, description: "Right side element" }
];
```

### Position Guide:
- **x**: 0.0 = left edge, 1.0 = right edge
- **y**: 0.0 = top edge, 1.0 = bottom edge
- **radius**: Size of clickable area (in pixels)

### Example Positions:
- Top-left corner: `x: 0.1, y: 0.1`
- Center: `x: 0.5, y: 0.5`
- Bottom-right: `x: 0.9, y: 0.9`

## Updating Descriptions

Also update the descriptions in `/pages/dimension/2.js` to match:

```javascript
const differences = [
  { id: 1, description: "Description of difference 1", location: "Where to look" },
  { id: 2, description: "Description of difference 2", location: "Where to look" },
  { id: 3, description: "Description of difference 3", location: "Where to look" }
];
```

## Testing

1. Open `/dimension` to play the game
2. Click on areas where differences should be
3. Adjust coordinates if the click detection is off
4. Check `/dimension2` to see the reference image

## Mobile Support

The game automatically adjusts for mobile devices and iPads using responsive design.
