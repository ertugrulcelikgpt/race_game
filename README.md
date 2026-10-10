# Nagihan Keskin – Personal Web Page

GMT 458 – Web GIS, Assignment 1. Personal web page built with HTML, CSS, JavaScript, OpenLayers and Leaflet.

## Pages
| File | Content |
|------|---------|
| `index.html` | Animated intro (avatar waves as you scroll / on click), About me, journey, languages, hobbies |
| `experience.html` | Computer skills and courses as **tables with images** |
| `maps.html` | **OpenLayers** and **Leaflet** maps |
| `contact.html` | Photo, contact buttons, message form |

All content (texts, skills, map points) is read from `data/db.js`. Edit only that file to update the site.

## Map issues
- **Issue 1 – overlapping markers:** detailed Ankara points only appear at zoom ≥ 11
  (OpenLayers: `minZoom` on the vector layer; Leaflet: layer group added/removed on `zoomend`).
- **Issue 2 – repeating Earth:** OpenLayers `wrapX: false` + a world `extent` on the view;
  Leaflet `noWrap: true` + `maxBounds`.

## Run locally
Open `index.html` in a browser, or start a small server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## AI usage
_TODO: list what was learned from AI and the estimated total AI usage time._
