/*
 * Site "veritabanı" (database).
 * Sitedeki tüm metinler, deneyimler, yetenekler ve harita noktaları buradan okunur.
 * Bilgi güncellemek için sadece bu dosyayı düzenlemek yeterli.
 *
 * Neden JSON yerine .js? GitHub Pages statik bir sunucu; ayrıca bu sayede site
 * index.html dosyasına çift tıklanarak (file://) da sorunsuz açılır.
 */
window.DB = {
  profile: {
    firstName: "Nagihan",
    lastName: "Keskin",
    title: "Geomatics Engineering Student",
    university: "Hacettepe University",
    location: "Beytepe, Çankaya / Ankara",
    born: "Giresun",
    email: "nagihankeskin4@gmail.com",
    linkedin: "https://www.linkedin.com/in/nagihan-keskin-bbb5a0267/",
    github: "https://github.com/",
    photo: "assets/img/nagihan.jpg",
    tagline: ["A curious mind.", "Maps, data &", "precise", "measurements."],
    about:
      "I'm Nagihan Keskin, a Geomatics Engineering student at Hacettepe University who loves turning the real world into accurate data. I explore the space between field surveying, photogrammetry and GIS. From the first measurement to the final map, I enjoy turning coordinates into stories people can understand. Let's map something incredible together!"
  },

  highlights: [
    "Project management",
    "Strong communication",
    "Adaptability",
    "Analytical thinking",
    "Teamwork",
    "Creativity"
  ],

  education: [
    {
      school: "Hacettepe University",
      degree: "B.Sc. Geomatics Engineering",
      period: "Sep 2020 – Present",
      place: "Beytepe, Ankara"
    }
  ],

  experience: [
    {
      company: "Erkon Map Engineering and Construction",
      role: "Intern",
      period: "01.07.2024 – 30.07.2024",
      text:
        "The projects I participated in and the measurements made during my internship played an important role in increasing my competencies in the field of survey engineering. I had the opportunity to observe how workflows are managed, task distribution and time management."
    }
  ],

  // level: 0-10 (CV'deki grafikten)
  skills: [
    { name: "QGIS", level: 7, icon: "qgis", use: "Spatial analysis & thematic maps" },
    { name: "Python", level: 6, icon: "python", use: "Scripting & data processing" },
    { name: "Agisoft", level: 6, icon: "agisoft", use: "Photogrammetry & UAV processing" },
    { name: "NetCad", level: 5, icon: "netcad", use: "Surveying & cadastral drafting" },
    { name: "AutoCAD", level: 3, icon: "autocad", use: "Technical drawing" },
    { name: "MS Office", level: 8, icon: "office", use: "Reports & presentations" },
    { name: "MS Excel", level: 6, icon: "excel", use: "Survey calculations & tables" }
  ],

  courses: [
    { date: "01.03.2025", name: "Transportation Projects Training", icon: "road" },
    { date: "09.11.2024", name: "Basic Photogrammetry and UAV Photogrammetry Training", icon: "drone" },
    { date: "06.02.2024", name: "AutoCAD Training Certificate", icon: "autocad" },
    { date: "20.08.2023", name: "Excel Training Certificate", icon: "excel" }
  ],

  languages: [
    { name: "Turkish", level: "Native", pct: 100 },
    { name: "English", level: "B2", pct: 70 },
    { name: "German", level: "A1", pct: 20 }
  ],

  hobbies: [
    { name: "Chess", icon: "♞" },
    { name: "Folk dance", icon: "💃" },
    { name: "Cycling", icon: "🚲" }
  ],

  // Harita: "life" noktaları her zoom seviyesinde görünür.
  // "detail" noktaları üst üste binmesin diye sadece yakınlaştırınca (zoom >= minZoom) görünür.
  map: {
    center: [35.2, 39.6], // [lon, lat] – Türkiye
    zoom: 6,
    detailMinZoom: 11,
    life: [
      { name: "Giresun", desc: "Hometown – born here in 2001", lon: 38.3895, lat: 40.9128 },
      { name: "Hacettepe University – Beytepe", desc: "Geomatics Engineering, 2020 – present", lon: 32.7347, lat: 39.8667 }
    ],
    detail: [
      { name: "Anıtkabir", desc: "Ankara landmark", lon: 32.8369, lat: 39.925 },
      { name: "Kızılay", desc: "City centre", lon: 32.8541, lat: 39.9208 },
      { name: "Ulus", desc: "Historic centre", lon: 32.8547, lat: 39.9419 },
      { name: "Ankara Castle", desc: "Historic site", lon: 32.8645, lat: 39.941 },
      { name: "Gençlik Parkı", desc: "Park", lon: 32.8494, lat: 39.9367 },
      { name: "Atakule", desc: "Tower", lon: 32.8556, lat: 39.8857 },
      { name: "METU", desc: "Campus", lon: 32.776, lat: 39.8914 },
      { name: "Bilkent", desc: "Campus", lon: 32.7484, lat: 39.8686 }
    ]
  }
};
