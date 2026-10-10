/* OpenLayers + Leaflet haritaları. Veriler data/db.js içindeki DB.map'ten gelir. */
(function () {
  const M = window.DB.map;
  const MIN = M.detailMinZoom;
  const PLACES = {
    turkey: { center: M.center, zoom: M.zoom },
    ankara: { center: [32.81, 39.91], zoom: 12 },
    giresun: { center: [38.3895, 40.9128], zoom: 12 }
  };
  document.querySelectorAll(".min-zoom").forEach((el) => (el.textContent = MIN));

  /* ===================== OpenLayers ===================== */
  if (window.ol && document.getElementById("ol-map")) {
    const { Map, View, Feature, Overlay } = ol;
    const toMerc = (p) => ol.proj.fromLonLat([p.lon, p.lat]);

    const pinStyle = (color, r) =>
      new ol.style.Style({
        image: new ol.style.Circle({
          radius: r,
          fill: new ol.style.Fill({ color }),
          stroke: new ol.style.Stroke({ color: "#fff", width: 2 })
        })
      });

    const makeLayer = (items, style, opts = {}) =>
      new ol.layer.Vector({
        source: new ol.source.Vector({
          wrapX: false,
          features: items.map((p) => new Feature({ geometry: new ol.geom.Point(toMerc(p)), name: p.name, desc: p.desc }))
        }),
        style,
        ...opts
      });

    const lifeLayer = makeLayer(M.life, pinStyle("#c22ed0", 9));
    // Issue 1: sadece zoom >= MIN iken görünür
    const detailLayer = makeLayer(M.detail, pinStyle("#7b2ff7", 6), { minZoom: MIN });

    const worldExtent = ol.proj.transformExtent([-180, -85, 180, 85], "EPSG:4326", "EPSG:3857");

    const popupEl = document.createElement("div");
    popupEl.className = "ol-popup";
    popupEl.style.display = "none";
    const popup = new Overlay({ element: popupEl, positioning: "bottom-center", stopEvent: false });

    const map = new Map({
      target: "ol-map",
      layers: [
        // Issue 2: wrapX false -> dünya tekrar etmez
        new ol.layer.Tile({ source: new ol.source.OSM({ wrapX: false }) }),
        lifeLayer,
        detailLayer
      ],
      overlays: [popup],
      view: new View({
        center: ol.proj.fromLonLat(M.center),
        zoom: M.zoom,
        minZoom: 2,
        extent: worldExtent, // görünüm tek dünyanın dışına çıkamaz
        constrainOnlyCenter: false,
        multiWorld: false
      })
    });

    const zoomEl = document.getElementById("ol-zoom");
    const updateZoom = () => (zoomEl.textContent = map.getView().getZoom().toFixed(1));
    map.getView().on("change:resolution", updateZoom);
    updateZoom();

    map.on("singleclick", (e) => {
      const f = map.forEachFeatureAtPixel(e.pixel, (f) => f);
      if (f) {
        popupEl.innerHTML = `<strong>${f.get("name")}</strong><br><small>${f.get("desc")}</small>`;
        popupEl.style.display = "block";
        popup.setPosition(f.getGeometry().getCoordinates());
      } else {
        popupEl.style.display = "none";
      }
    });
    map.on("pointermove", (e) => {
      map.getTargetElement().style.cursor = map.hasFeatureAtPixel(e.pixel) ? "pointer" : "";
    });

    document.querySelectorAll("[data-ol-fly]").forEach((b) =>
      b.addEventListener("click", () => {
        const p = PLACES[b.dataset.olFly];
        map.getView().animate({ center: ol.proj.fromLonLat(p.center), zoom: p.zoom, duration: 1200 });
      })
    );
  }

  /* ===================== Leaflet ===================== */
  if (window.L && document.getElementById("lf-map")) {
    const worldBounds = L.latLngBounds([-85, -180], [85, 180]);
    const map = L.map("lf-map", {
      center: [M.center[1], M.center[0]],
      zoom: M.zoom,
      minZoom: 2,
      maxBounds: worldBounds, // Issue 2
      maxBoundsViscosity: 1.0,
      worldCopyJump: false
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      noWrap: true, // Issue 2: dünya tekrar etmez
      bounds: worldBounds
    }).addTo(map);

    const dot = (color, r) => ({ radius: r, color: "#fff", weight: 2, fillColor: color, fillOpacity: 1 });

    M.life.forEach((p) =>
      L.circleMarker([p.lat, p.lon], dot("#c22ed0", 9)).bindPopup(`<strong>${p.name}</strong><br>${p.desc}`).addTo(map)
    );

    const detail = L.layerGroup(
      M.detail.map((p) => L.circleMarker([p.lat, p.lon], dot("#7b2ff7", 6)).bindPopup(`<strong>${p.name}</strong><br>${p.desc}`))
    );

    // Issue 1: zoom eşiği
    const zoomEl = document.getElementById("lf-zoom");
    const sync = () => {
      const z = map.getZoom();
      zoomEl.textContent = z;
      if (z >= MIN) detail.addTo(map);
      else map.removeLayer(detail);
    };
    map.on("zoomend", sync);
    sync();

    document.querySelectorAll("[data-lf-fly]").forEach((b) =>
      b.addEventListener("click", () => {
        const p = PLACES[b.dataset.lfFly];
        map.flyTo([p.center[1], p.center[0]], p.zoom, { duration: 1.2 });
      })
    );

    // Harita gizli bir kapsayıcıda (fade-in) yüklendiyse boyutu yeniden hesapla
    setTimeout(() => map.invalidateSize(), 900);
  }
})();
