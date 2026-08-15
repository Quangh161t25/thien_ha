/**
 * Sparkling Heart Galaxy 3D - Vũ Trụ Tình Yêu
 * Pure Three.js & Ultra-Fast Google Sheets API with Cinematic Cosmic Zoom
 */

// Google Cloud Service Account API Configuration (from test-gia-ason.json)
const SERVICE_ACCOUNT = {
    type: "service_account",
    project_id: "cty-lnk-161",
    private_key_id: "8b79277cbe4d9b5a7b8254a0961a5d4932283388",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3NN84hLTkQPZd\nLj7niXZTICq7nHsuTn3J6r2Paq12m70/lYSmrwh1i0EStr9bO19QM8cevGlslwGr\nWSVOLJlc6+w1HGPKvRXtA41kYV9MYIvpzIPQtkFE7Hxq71QyBARcv39Lfzze6Ioj\n3G8VBvAKFLAnCUr97GHRv+KbCTFxPZupd3PEB+xS5ZUlzdBCEZvDid3iXaaEJJ+l\nTd1apAGQHjtnDTLOkiTa8zf7X5ebALwnI9MziOdN8VyprHXGhkachPbKyrG0QwEs\n2jtiI6Y5ULsBPjNefoavH8MKU5DEAT9h0fZ7KfsKYVMDuXqmEKBs0D3B4Z6aDZQW\nwT2dDRZDAgMBAAECggEAEIuVoSzZVuFhaz1GI9ji0IacjvO50cIq7M8Zrj4/F756\nEw6PIhKENafAb7U4INm2AnzUMO8CqL9Jpxs85qUM3W4JysSByqLUiRW2184amIyb\nj7jCXfLBTQn8AbHgrUepl5d/vBmFYMgon/mqjbNiGDb4FZgEQSkie5o6fi/dWp5d\nNahbZl+WTOB/znhAfKh/zferHNxldR/ERmwOubZUerkqysWiBigc3ovpLSUof9ur\nz3hNPPp0CKQjF40xuQc6FYTHUHMLuMvp78PXuc/mYqQmZ8VOGhU+faGtZ4m+QJly\ndF5dS8U5cwKEF+ptuAUiWSahn6INb9yKn3+FcsW0UQKBgQDb8N4eWFvbgpRo/vxo\nwBN2u2TWubj6clcrq/1a+VR0njC28Can0ogJHhrFhPxVs5D/rugs3HlbyAXJFptY\nV0DZPCwBxGU5P5RbGjXWWEUXjp4ISKQD8WKfVlXNr79TqLdOg2NZBYQAi06Cpo/T\nPV9l7LSG2Tj/9WdvD7W2wvrpaQKBgQDVPjpJN6xh7+sHtSU0mjKvrqigpHbuSQ/o\nXpUaWSIpJffm5QpFPAOcTT5mHZCyllicJQIrfPSY+sH8n+sF03CUqVkV4Q2UqfOf\npFaLDB4P6SQ8iesZyF4VKFrj/cAvRJmp0e5W/DRnFkoEp+8c+nrru2+Dzm9kb7Uq\n0CiltqYAywKBgBtcfrV1to+7Ue0x84KwintV2rifyDRX7yI+tjkQFYKgf1zyyUxN\nc6D2vsvdvGqI+TvlrXqPPwW8/4NBrbeyux2LT8o0fYc+sp0WyKXOu2Gv21caelUH\nPYam/eultn6Y2Z0J2V0kw4Qx0GWOhQv5cZnDdb3k3iNxixmU8b03ynEpAoGBAKEA\n7O0fNe50QRZ+tOq0ihSPYQ55XrqnO3WNBDLynZJH8pbI1CpWF7vJrpVXOUs9rQWo\nA61mGR/wJMtiywaJEHWOL48PbzuR3jno0NcHfSMyOoPi9jlvSWncIFQH4TVPLF5F\n/Rh8L+ytrZE6YpWUoX6e9KGmGgDRPw5mQGpuL4RlAoGADe9n080SXlsUk4nHVjUz\nEfv7EBoBkgOpqb9T1foRfJl46NxmmTOYV3iGIhjwcDskEg284k4iq/gH6EEFyEBc\nVz13jzB1nBgjfezFesVQz7bA/+Wik6HZtxAxVg38BKMt+Q1tYw9wOjbGPqOn++VC\nsR2Sh8e3h3Knd6j1tceRIFU=\n-----END PRIVATE KEY-----\n",
    client_email: "test-gia-ason@api-test-sheet-161.iam.gserviceaccount.com",
    client_id: "104867274738950549003",
    token_uri: "https://oauth2.googleapis.com/token"
};

// Token Caching
let cachedAccessToken = null;
let tokenExpiresAt = 0;

// Configuration & Global State
const CONFIG = {
    defaultSheetId: '1eJkfAcu32pMIvI1n2tD2vGGdDpmNBDHPuKE8RgkPNNk',
    particleCount: 4000,
    orbitRadius: 28,
    orbitSpeed: 0.5,
    meteorSpeed: 0.5,
    meteorBeltMode: '1',
    rotationDir: 'reverse',
    shape: 'sphere',
    photoSize: 1.0,
    brightness: 1.0,
    autoRotate: true,
    theme: 'pink'
};

const THEMES = {
    pink:   { c1: '#ff2a85', c2: '#ff73b3', star: '#fff0f5' },
    gold:   { c1: '#ffb703', c2: '#fb8500', star: '#fffbe6' },
    purple: { c1: '#9d4edd', c2: '#c77dff', star: '#f8f0ff' },
    cyan:   { c1: '#00b4d8', c2: '#90e0ef', star: '#f0fcfd' },
    white:  { c1: '#ffffff', c2: '#ffb3c6', star: '#ffffff' }
};

// Preset Romantic Badges and Images (Empty by default - only loaded when ID is provided)
const INITIAL_BADGES = [];
const INITIAL_PHOTOS = [];

// App State
let scene, camera, renderer, controls;
let heartParticles, heartGeometry, heartMaterial, starField;
let meteoriteRing1, meteoriteRing2;
let orbitGroup;
let photoMeshes = [];
let shootingStars = [];
let sparkleBursts = [];
let lastShootingStarTime = 0;
let clock = new THREE.Clock();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let isAudioPlaying = false;
let audioCtx = null;
let chimeInterval = null;

// Cinematic Zoom Animation State (Zoom từ gần ra xa)
const zoomAnimation = {
    active: false,
    startTime: 0,
    duration: 2.2, // seconds
    startPos: new THREE.Vector3(0, 4, 8),
    targetPos: new THREE.Vector3(0, 30, 60)
};

// Trigger Cosmic Zoom Animation (Camera glides back from near to far)
function triggerCosmicZoomAnimation() {
    zoomAnimation.active = true;
    zoomAnimation.startTime = clock.getElapsedTime();
    if (camera) camera.position.copy(zoomAnimation.startPos);
    if (controls) {
        controls.target.set(0, 0, 0);
        controls.update();
    }

    // Contract items for expansion
    photoMeshes.forEach(mesh => {
        mesh.userData.currentExpansion = 0.05;
        mesh.scale.set(0.01, 0.01, 0.01);
    });

    // Spawn central cosmic burst
    spawnClickBurst(new THREE.Vector3(0, 0, 0));
}

// Toast Notification Helper
function showToast(message, type = 'normal') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
    
    let icon = 'fa-sparkles';
    if (type === 'error') icon = 'fa-circle-exclamation';
    else if (type === 'success') icon = 'fa-circle-check';
    else icon = 'fa-heart';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
}

// Base64URL Helpers for Web Crypto JWT
function base64UrlEncode(str) {
    return btoa(unescape(encodeURIComponent(str)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

function arrayBufferToBase64Url(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Generate Google OAuth2 Access Token using Web Crypto RSA-SHA256
async function getGoogleAccessToken() {
    const now = Math.floor(Date.now() / 1000);
    if (cachedAccessToken && tokenExpiresAt > now + 60) {
        return cachedAccessToken;
    }

    try {
        const pem = SERVICE_ACCOUNT.private_key
            .replace(/-----BEGIN PRIVATE KEY-----/g, '')
            .replace(/-----END PRIVATE KEY-----/g, '')
            .replace(/\s+/g, '');
        
        const binaryDer = Uint8Array.from(atob(pem), c => c.charCodeAt(0));

        const cryptoKey = await crypto.subtle.importKey(
            "pkcs8",
            binaryDer.buffer,
            {
                name: "RSASSA-PKCS1-v1_5",
                hash: { name: "SHA-256" }
            },
            false,
            ["sign"]
        );

        const header = { alg: "RS256", typ: "JWT" };
        const payload = {
            iss: SERVICE_ACCOUNT.client_email,
            scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
            aud: "https://oauth2.googleapis.com/token",
            exp: now + 3600,
            iat: now
        };

        const unsignedToken = base64UrlEncode(JSON.stringify(header)) + "." + base64UrlEncode(JSON.stringify(payload));
        const signature = await crypto.subtle.sign(
            "RSASSA-PKCS1-v1_5",
            cryptoKey,
            new TextEncoder().encode(unsignedToken)
        );

        const jwt = unsignedToken + "." + arrayBufferToBase64Url(signature);

        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
                assertion: jwt
            })
        });

        if (!tokenRes.ok) {
            const errText = await tokenRes.text();
            throw new Error("Token exchange error: " + errText);
        }

        const tokenData = await tokenRes.json();
        cachedAccessToken = tokenData.access_token;
        tokenExpiresAt = now + (tokenData.expires_in || 3600);
        return cachedAccessToken;
    } catch (err) {
        console.warn("Service Account JWT Error:", err);
        return null;
    }
}

// Convert Google Drive & direct URLs to super fast high-res thumbnail URLs
function formatImageUrl(url) {
    if (!url || typeof url !== 'string') return '';
    url = url.trim();

    if (url.includes('drive.google.com')) {
        const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            // Google Drive thumbnail service sz=w1000 loads 20x faster with sharp quality
            return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1000`;
        }
    }
    return url;
}

// Extract Sheet ID from string or full URL
function extractSheetId(input) {
    if (!input) return null;
    const match = input.match(/\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : input.trim();
}

// Parse URL Parameters (supports ?id=1 or ?sheet=SHEET_ID&id=1 or ?id=SHEET_ID)
function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    let sheetId = urlParams.get('sheet') || urlParams.get('sheet_id');
    let rowId = urlParams.get('row_id') || urlParams.get('user_id') || urlParams.get('uid');
    const genericId = urlParams.get('id');

    if (genericId) {
        const cleanId = genericId.trim();
        // If cleanId is long (like a Google Sheet ID ~25+ chars or contains /d/)
        if (cleanId.length > 25 || cleanId.includes('/')) {
            sheetId = cleanId;
        } else {
            // It's a row ID to filter (e.g. 1, 2, 'user1', 'quang', etc.)
            rowId = cleanId;
        }
    }

    return {
        sheetId: sheetId || CONFIG.defaultSheetId,
        rowId: rowId || null
    };
}

// Fast GViz Data Fetcher (ultra low latency)
async function fetchGvizData(sheetId, filterIdStr) {
    const primaryUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=thien_ha&t=${Date.now()}`;
    const fallbackUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&t=${Date.now()}`;

    let response = await fetch(primaryUrl);
    let text = await response.text();
    let jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);

    if (!jsonMatch || text.includes('INVALID_ARGUMENT') || text.includes('NO_SHEET')) {
        response = await fetch(fallbackUrl);
        text = await response.text();
        jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    }

    if (!jsonMatch) throw new Error("GViz parse error");

    const data = JSON.parse(jsonMatch[1]);
    if (!data.table || !data.table.rows) throw new Error("No rows in GViz");

    const fetchedPhotos = [];
    const fetchedBadges = [];

    data.table.rows.forEach((row, index) => {
        if (!row.c) return;
        const cellA = row.c[0] ? (row.c[0].v !== undefined ? row.c[0].v : row.c[0].f) : null;
        const cellB = row.c[1] ? (row.c[1].v !== undefined ? row.c[1].v : row.c[1].f) : null;
        const cellC = row.c[2] ? (row.c[2].v !== undefined ? row.c[2].v : row.c[2].f) : null;

        if (index === 0) {
            const strA = String(cellA || '').toLowerCase().trim();
            const strB = String(cellB || '').toLowerCase().trim();
            if (strA === 'id' || strB.includes('anh') || strB.includes('image')) return;
        }

        const cellId = cellA !== null && cellA !== undefined ? String(cellA).trim() : null;
        const cellAnh = cellB ? String(cellB).trim() : null;
        const cellText = cellC ? String(cellC).trim() : null;

        if (filterIdStr && filterIdStr !== 'all') {
            if (!cellId || cellId.toLowerCase() !== filterIdStr) return;
        }

        const anhList = cellAnh ? cellAnh.split('|').map(s => s.trim()).filter(s => s.length > 0) : [];
        const textList = cellText ? cellText.split('|').map(s => s.trim()).filter(s => s.length > 0) : [];

        anhList.forEach((rawUrl, photoIdx) => {
            if (rawUrl.startsWith('http') || rawUrl.startsWith('data:')) {
                const caption = textList[photoIdx] || textList[0] || "Kỷ Niệm Tình Yêu 💖";
                fetchedPhotos.push({
                    src: formatImageUrl(rawUrl),
                    caption: caption
                });
            }
        });

        textList.forEach((txt) => {
            if (txt) {
                fetchedBadges.push({
                    text: txt,
                    color: "#ff2a85"
                });
            }
        });
    });

    if (fetchedPhotos.length === 0 && fetchedBadges.length === 0) {
        throw new Error("No matching rows found in GViz");
    }

    return { photos: fetchedPhotos, badges: fetchedBadges };
}

// Google Sheets API v4 Data Fetcher via Service Account
async function fetchServiceAccountData(sheetId, filterIdStr) {
    const token = await getGoogleAccessToken();
    if (!token) throw new Error("No Google token");

    const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties.title`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!metaRes.ok) throw new Error("Meta error");

    const metaData = await metaRes.json();
    let targetSheetTitle = metaData.sheets[0].properties.title;
    const thienHaSheet = metaData.sheets.find(s => s.properties.title.toLowerCase() === 'thien_ha');
    if (thienHaSheet) targetSheetTitle = thienHaSheet.properties.title;

    const valuesRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/'${encodeURIComponent(targetSheetTitle)}'!A:C`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!valuesRes.ok) throw new Error("Values error");

    const valuesData = await valuesRes.json();
    const rows = valuesData.values || [];

    const fetchedPhotos = [];
    const fetchedBadges = [];

    rows.forEach((row, index) => {
        if (index === 0) {
            const col0 = String(row[0] || '').toLowerCase().trim();
            const col1 = String(row[1] || '').toLowerCase().trim();
            if (col0 === 'id' || col1.includes('anh') || col1.includes('image')) return;
        }

        const cellId = row[0] !== undefined && row[0] !== null ? String(row[0]).trim() : null;
        const cellAnh = row[1] ? String(row[1]).trim() : null;
        const cellText = row[2] ? String(row[2]).trim() : null;

        if (filterIdStr && filterIdStr !== 'all') {
            if (!cellId || cellId.toLowerCase() !== filterIdStr) return;
        }

        const anhList = cellAnh ? cellAnh.split('|').map(s => s.trim()).filter(s => s.length > 0) : [];
        const textList = cellText ? cellText.split('|').map(s => s.trim()).filter(s => s.length > 0) : [];

        anhList.forEach((rawUrl, photoIdx) => {
            if (rawUrl.startsWith('http') || rawUrl.startsWith('data:')) {
                const caption = textList[photoIdx] || textList[0] || "Kỷ Niệm Tình Yêu 💖";
                fetchedPhotos.push({
                    src: formatImageUrl(rawUrl),
                    caption: caption
                });
            }
        });

        textList.forEach((txt) => {
            if (txt) {
                fetchedBadges.push({
                    text: txt,
                    color: "#ff2a85"
                });
            }
        });
    });

    if (fetchedPhotos.length === 0 && fetchedBadges.length === 0) {
        throw new Error("No matching rows found in Service Account API");
    }

    return { photos: fetchedPhotos, badges: fetchedBadges };
}

/**
 * Fetch Google Sheet Data from Tab 'thien_ha' in ultra-fast parallel mode
 */
async function loadGoogleSheetData(sheetIdInput, targetRowId = null) {
    const sheetId = extractSheetId(sheetIdInput);
    if (!sheetId) {
        showToast("Vui lòng nhập Google Sheet ID hoặc Link!", "error");
        return false;
    }

    const filterIdStr = targetRowId ? String(targetRowId).toLowerCase().trim() : null;

    try {
        // Run both GViz (super fast) and Service Account in parallel for instant response
        const result = await Promise.any([
            fetchGvizData(sheetId, filterIdStr),
            fetchServiceAccountData(sheetId, filterIdStr)
        ]);

        if (result && (result.photos.length > 0 || result.badges.length > 0)) {
            updateOrbitWithSheetData(result.photos, result.badges);
            triggerCosmicZoomAnimation();

            if (targetRowId) {
                showToast(`Đã nạp ${result.photos.length} ảnh & ${result.badges.length} lời chúc cho ID "${targetRowId}"! 💖`, "success");
            } else {
                showToast(`Đã đồng bộ ${result.photos.length} ảnh & ${result.badges.length} lời chúc! 💖`, "success");
            }
            return true;
        }
    } catch (err) {
        console.error("Sheet load error:", err);
    }

    if (targetRowId) {
        showToast(`Không tìm thấy dữ liệu cho ID "${targetRowId}" trong Sheet!`, "error");
    } else {
        showToast("Không thể tải dữ liệu! Hãy kiểm tra quyền chia sẻ Sheet.", "error");
    }
    return false;
}

// Update Orbiting Items with newly loaded Google Sheet photos & text
function updateOrbitWithSheetData(photos, badges) {
    while (orbitGroup.children.length > 0) {
        orbitGroup.remove(orbitGroup.children[0]);
    }
    photoMeshes = [];

    const totalItems = Math.max(1, photos.length + badges.length);

    photos.forEach((item, idx) => {
        const src = typeof item === 'string' ? item : item.src;
        const caption = typeof item === 'object' && item.caption ? item.caption : "Kỷ Niệm Tình Yêu 💖";

        createPhotoTexture(src, (texture) => {
            const geometry = new THREE.PlaneGeometry(3.6, 3.6);
            const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { 
                isPhoto: true, 
                src: src, 
                caption: caption,
                angleOffset: (idx / totalItems) * Math.PI * 2 + Math.random() * 0.3, 
                radiusOffset: 16 + Math.random() * 22, 
                yOffset: (Math.random() - 0.5) * 14,
                speedFactor: 0.8 + Math.random() * 0.5,
                currentExpansion: 0.05
            };
            mesh.scale.set(0.01, 0.01, 0.01);
            orbitGroup.add(mesh);
            photoMeshes.push(mesh);
        });
    });

    badges.forEach((badge, idx) => {
        const text = typeof badge === 'string' ? badge : badge.text;
        const color = typeof badge === 'object' && badge.color ? badge.color : "#ff2a85";

        const texture = createBadgeTexture(text, color);
        const geometry = new THREE.PlaneGeometry(5.2, 1.6);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        const totalIdx = photos.length + idx;
        mesh.userData = { 
            isBadge: true, 
            text: text, 
            angleOffset: (totalIdx / totalItems) * Math.PI * 2 + Math.random() * 0.3, 
            radiusOffset: 15 + Math.random() * 21, 
            yOffset: (Math.random() - 0.5) * 14,
            speedFactor: 0.8 + Math.random() * 0.5,
            currentExpansion: 0.05
        };
        mesh.scale.set(0.01, 0.01, 0.01);
        orbitGroup.add(mesh);
        photoMeshes.push(mesh);
    });
}

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
    initScene();
    createSparklingHeart();
    createStarField();
    createMeteoriteRings();
    
    // Clear any previous orbit items
    clearOrbitItems();

    // Auto-load Sheet ONLY when an ID parameter is present in URL (?id=...)
    const { sheetId, rowId } = parseUrlParams();

    const rowIdInput = document.getElementById('row-id-input');
    if (rowIdInput && rowId) {
        rowIdInput.value = rowId;
    }

    if (rowId) {
        // Only load and render photos/texts if an ID is specified
        loadGoogleSheetData(sheetId || CONFIG.defaultSheetId, rowId);
    } else {
        // No ID specified -> do NOT show any photos or texts, just render the cosmic galaxy
        triggerCosmicZoomAnimation();
    }

    initEvents();
    animate();
});

// Setup 3D Scene
function initScene() {
    const container = document.getElementById('canvas-container');

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040207, 0.015);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 4, 8); // Start close for cosmic zoom animation

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.minDistance = 12;
    controls.maxDistance = 100;
    controls.target.set(0, 0, 0);
    controls.update();

    orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
}

// Generate Sparkle Texture for Particles
function createSparkleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 200, 230, 0.8)');
    grad.addColorStop(0.5, 'rgba(255, 42, 133, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(32, 6); ctx.lineTo(32, 58);
    ctx.moveTo(6, 32); ctx.lineTo(58, 32);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
}

// Create 3D Central Sparkling Shape
function createSparklingHeart() {
    if (heartParticles) scene.remove(heartParticles);

    const count = CONFIG.particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    const theme = THEMES[CONFIG.theme] || THEMES.pink;
    const color1 = new THREE.Color(theme.c1);
    const color2 = new THREE.Color(theme.c2);

    for (let i = 0; i < count; i++) {
        let x, y, z;

        if (CONFIG.shape === 'heart') {
            if (i < count * 0.75) {
                const t = Math.random() * Math.PI * 2;
                const scale = 0.55;
                const hx = 16 * Math.pow(Math.sin(t), 3);
                const hy = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
                const spread = (Math.random() - 0.5) * 1.8;
                const zSpread = (Math.random() - 0.5) * 3.5;

                x = (hx + spread) * scale;
                y = (hy + spread) * scale;
                z = zSpread;
            } else {
                const radius = 8 + Math.random() * 12;
                const angle = Math.random() * Math.PI * 2;
                x = Math.cos(angle) * radius;
                y = Math.sin(angle) * (radius * 0.6);
                z = (Math.random() - 0.5) * 6;
            }
        } else if (CONFIG.shape === 'spiral') {
            const arm = i % 4;
            const r = Math.pow(Math.random(), 0.5) * 13.5;
            const angle = r * 0.55 + (arm * Math.PI / 2) + (Math.random() - 0.5) * 0.4;
            x = Math.cos(angle) * r;
            y = (Math.random() - 0.5) * (1.6 - r * 0.08);
            z = Math.sin(angle) * r;
        } else if (CONFIG.shape === 'saturn') {
            if (i < count * 0.45) {
                const phi = Math.acos(1 - 2 * Math.random());
                const theta = Math.PI * 2 * Math.random();
                const radius = 5.4 * Math.pow(Math.random(), 0.5);
                x = radius * Math.sin(phi) * Math.cos(theta);
                y = radius * Math.sin(phi) * Math.sin(theta);
                z = radius * Math.cos(phi);
            } else {
                const r = 7.2 + Math.random() * 6.5;
                const theta = Math.PI * 2 * Math.random();
                const tilt = Math.PI * 0.18;
                const rx = Math.cos(theta) * r;
                const ry = (Math.random() - 0.5) * 0.5;
                const rz = Math.sin(theta) * r;

                x = rx;
                y = ry * Math.cos(tilt) - rz * Math.sin(tilt);
                z = ry * Math.sin(tilt) + rz * Math.cos(tilt);
            }
        } else {
            // SPHERE MODE
            if (i < count * 0.82) {
                const phi = Math.acos(1 - 2 * Math.random());
                const theta = Math.PI * 2 * Math.random();
                const radius = 9.5 * Math.pow(Math.random(), 0.4);

                x = radius * Math.sin(phi) * Math.cos(theta);
                y = radius * Math.sin(phi) * Math.sin(theta);
                z = radius * Math.cos(phi);
            } else {
                const radius = 9.5 + Math.random() * 5.5;
                const phi = Math.acos(1 - 2 * Math.random());
                const theta = Math.PI * 2 * Math.random();

                x = radius * Math.sin(phi) * Math.cos(theta);
                y = radius * Math.sin(phi) * Math.sin(theta);
                z = radius * Math.cos(phi);
            }
        }

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mixedColor = color1.clone().lerp(color2, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;

        sizes[i] = Math.random() * 0.7 + 0.3;
        phases[i] = Math.random() * Math.PI * 2;
    }

    heartGeometry = new THREE.BufferGeometry();
    heartGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    heartGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    heartGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    heartGeometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const sparkleTexture = createSparkleTexture();

    heartMaterial = new THREE.PointsMaterial({
        size: 1.2,
        map: sparkleTexture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });

    heartParticles = new THREE.Points(heartGeometry, heartMaterial);
    scene.add(heartParticles);
}

// Background Starfield
function createStarField() {
    if (starField) scene.remove(starField);

    const starCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 300;
        positions[i + 1] = (Math.random() - 0.5) * 300;
        positions[i + 2] = (Math.random() - 0.5) * 300;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.6,
        transparent: true,
        opacity: 0.65
    });

    starField = new THREE.Points(geometry, material);
    scene.add(starField);
}

// Create Meteorite Belts
function createMeteoriteRings() {
    if (meteoriteRing1) { scene.remove(meteoriteRing1); meteoriteRing1 = null; }
    if (meteoriteRing2) { scene.remove(meteoriteRing2); meteoriteRing2 = null; }

    const theme = THEMES[CONFIG.theme] || THEMES.pink;
    const color1 = new THREE.Color(theme.c1);
    const color2 = new THREE.Color(theme.c2);
    const whiteColor = new THREE.Color('#ffffff');

    if (CONFIG.meteorBeltMode === '1') {
        const count = 2500;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            const radius = 16 + Math.random() * 22;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 2.2;

            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = height;
            pos[i * 3 + 2] = Math.sin(angle) * radius;

            const c = color1.clone().lerp(color2, Math.random()).lerp(whiteColor, Math.random() * 0.7);
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

        const mat = new THREE.PointsMaterial({
            size: 0.8,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        meteoriteRing1 = new THREE.Points(geo, mat);
        meteoriteRing1.rotation.x = 0;
        meteoriteRing1.rotation.z = 0;
        scene.add(meteoriteRing1);
    } else {
        const count1 = 1600;
        const pos1 = new Float32Array(count1 * 3);
        const col1 = new Float32Array(count1 * 3);

        for (let i = 0; i < count1; i++) {
            const radius = 15 + Math.random() * 13;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 3.5;

            pos1[i * 3] = Math.cos(angle) * radius;
            pos1[i * 3 + 1] = height + Math.sin(angle * 3) * 1.5;
            pos1[i * 3 + 2] = Math.sin(angle) * radius;

            const c = color1.clone().lerp(whiteColor, Math.random() * 0.65);
            col1[i * 3] = c.r;
            col1[i * 3 + 1] = c.g;
            col1[i * 3 + 2] = c.b;
        }

        const geo1 = new THREE.BufferGeometry();
        geo1.setAttribute('position', new THREE.BufferAttribute(pos1, 3));
        geo1.setAttribute('color', new THREE.BufferAttribute(col1, 3));

        const mat1 = new THREE.PointsMaterial({
            size: 0.85,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });

        meteoriteRing1 = new THREE.Points(geo1, mat1);
        meteoriteRing1.rotation.x = Math.PI * 0.22;
        meteoriteRing1.rotation.z = Math.PI * 0.1;
        scene.add(meteoriteRing1);

        const count2 = 1400;
        const pos2 = new Float32Array(count2 * 3);
        const col2 = new Float32Array(count2 * 3);

        for (let i = 0; i < count2; i++) {
            const radius = 28 + Math.random() * 17;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 4.5;

            pos2[i * 3] = Math.cos(angle) * radius;
            pos2[i * 3 + 1] = height;
            pos2[i * 3 + 2] = Math.sin(angle) * radius;

            const c = color2.clone().lerp(whiteColor, Math.random() * 0.85);
            col2[i * 3] = c.r;
            col2[i * 3 + 1] = c.g;
            col2[i * 3 + 2] = c.b;
        }

        const geo2 = new THREE.BufferGeometry();
        geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
        geo2.setAttribute('color', new THREE.BufferAttribute(col2, 3));

        const mat2 = new THREE.PointsMaterial({
            size: 0.65,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        meteoriteRing2 = new THREE.Points(geo2, mat2);
        meteoriteRing2.rotation.x = -Math.PI * 0.25;
        scene.add(meteoriteRing2);
    }
}

// Create Dynamic Canvas Textures for Love Badges
function createBadgeTexture(text, bgColor = "#ff2a85") {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 160;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(15, 8, 20, 0.82)';
    ctx.strokeStyle = bgColor;
    ctx.lineWidth = 6;
    
    const r = 40;
    ctx.beginPath();
    ctx.moveTo(r, 10);
    ctx.lineTo(canvas.width - r, 10);
    ctx.quadraticCurveTo(canvas.width - 10, 10, canvas.width - 10, r);
    ctx.lineTo(canvas.width - 10, canvas.height - r);
    ctx.quadraticCurveTo(canvas.width - 10, canvas.height - 10, canvas.width - r, canvas.height - 10);
    ctx.lineTo(r, canvas.height - 10);
    ctx.quadraticCurveTo(10, canvas.height - 10, 10, canvas.height - r);
    ctx.lineTo(10, r);
    ctx.quadraticCurveTo(10, 10, r, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = bgColor;
    ctx.shadowBlur = 15;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
}

// Create Canvas Frame Texture for Photos
function createPhotoTexture(imgSrc, callback) {
    const formattedUrl = formatImageUrl(imgSrc);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = formattedUrl;
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowColor = 'rgba(255, 42, 133, 0.5)';
        ctx.shadowBlur = 20;
        
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(16, 16, 480, 480, 24);
        } else {
            ctx.rect(16, 16, 480, 480);
        }
        ctx.fill();

        ctx.save();
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(32, 32, 448, 448, 18);
        } else {
            ctx.rect(32, 32, 448, 448);
        }
        ctx.clip();
        ctx.drawImage(img, 32, 32, 448, 448);
        ctx.restore();

        ctx.strokeStyle = 'rgba(255, 42, 133, 0.8)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(16, 16, 480, 480, 24);
        } else {
            ctx.rect(16, 16, 480, 480);
        }
        ctx.stroke();

        const texture = new THREE.CanvasTexture(canvas);
        callback(texture);
    };
    img.onerror = () => {
        const badgeTex = createBadgeTexture("KỶ NIỆM 💖", "#ff2a85");
        callback(badgeTex);
    };
}

// Clear Orbiting Items
function clearOrbitItems() {
    if (orbitGroup) {
        while (orbitGroup.children.length > 0) {
            orbitGroup.remove(orbitGroup.children[0]);
        }
    }
    photoMeshes = [];
}

// Add User Custom Photo File
function addCustomPhoto(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const src = e.target.result;
        createPhotoTexture(src, (texture) => {
            const geometry = new THREE.PlaneGeometry(4.2, 4.2);
            const material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = { 
                isPhoto: true, 
                src: src, 
                caption: "Khoảnh Khắc Đẹp ✨",
                angleOffset: Math.random() * Math.PI * 2, 
                radiusOffset: 16 + Math.random() * 22, 
                yOffset: (Math.random() - 0.5) * 14,
                speedFactor: 0.8 + Math.random() * 0.5,
                currentExpansion: 1.0
            };

            mesh.scale.set(0.01, 0.01, 0.01);
            orbitGroup.add(mesh);
            photoMeshes.push(mesh);

            let s = 0.01;
            const popInterval = setInterval(() => {
                s += 0.08;
                if (s >= 1) {
                    s = 1;
                    clearInterval(popInterval);
                }
                mesh.scale.set(s, s, s);
            }, 16);

            showToast("Đã thêm ảnh vào vũ trụ! ✨", "success");
        });
    };
    reader.readAsDataURL(file);
}

// Add Custom Text Badge
function addCustomText(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();
    const texture = createBadgeTexture(cleanText, "#ff2a85");
    const geometry = new THREE.PlaneGeometry(5.8, 1.8);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { 
        isBadge: true, 
        text: cleanText, 
        angleOffset: Math.random() * Math.PI * 2, 
        radiusOffset: 15 + Math.random() * 21, 
        yOffset: (Math.random() - 0.5) * 14,
        speedFactor: 0.8 + Math.random() * 0.5,
        currentExpansion: 1.0
    };
    
    mesh.scale.set(0.01, 0.01, 0.01);
    orbitGroup.add(mesh);
    photoMeshes.push(mesh);

    let s = 0.01;
    const popInterval = setInterval(() => {
        s += 0.08;
        if (s >= 1) {
            s = 1;
            clearInterval(popInterval);
        }
        mesh.scale.set(s, s, s);
    }, 16);

    showToast(`Đã gắn "${cleanText}" vào ngân hà! 💖`, "success");
}

// Shooting Meteors
function spawnShootingStar() {
    const theme = THEMES[CONFIG.theme] || THEMES.pink;
    const tailColor = new THREE.Color(theme.c1).lerp(new THREE.Color('#ffffff'), 0.5);

    const startPos = new THREE.Vector3(
        (Math.random() - 0.2) * 110,
        35 + Math.random() * 25,
        (Math.random() - 0.5) * 40
    );

    const velocity = new THREE.Vector3(
        -40 - Math.random() * 25,
        -25 - Math.random() * 20,
        (Math.random() - 0.5) * 15
    );

    const points = [];
    const tailLength = 12;
    for (let i = 0; i < tailLength; i++) {
        points.push(startPos.clone().sub(velocity.clone().normalize().multiplyScalar(i * 0.9)));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: tailColor,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    const line = new THREE.Line(geometry, material);

    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute('position', new THREE.Float32BufferAttribute([startPos.x, startPos.y, startPos.z], 3));
    const headMat = new THREE.PointsMaterial({
        size: 2.5,
        color: 0xffffff,
        map: createSparkleTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const headPoint = new THREE.Points(headGeo, headMat);

    const group = new THREE.Group();
    group.add(line);
    group.add(headPoint);

    scene.add(group);

    shootingStars.push({
        group: group,
        velocity: velocity,
        life: 1.0
    });
}

function updateShootingStars(delta) {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.life -= delta * 0.65;

        if (star.life <= 0) {
            scene.remove(star.group);
            shootingStars.splice(i, 1);
            continue;
        }

        star.group.position.x += star.velocity.x * delta;
        star.group.position.y += star.velocity.y * delta;
        star.group.position.z += star.velocity.z * delta;

        star.group.children.forEach(child => {
            if (child.material) {
                child.material.opacity = star.life * 0.9;
            }
        });
    }
}

// Sparkle Particle Burst on Click
function spawnClickBurst(point) {
    const particleCount = 35;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = [];

    const theme = THEMES[CONFIG.theme] || THEMES.pink;
    const color1 = new THREE.Color(theme.c1);
    const color2 = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;

        const c = color1.clone().lerp(color2, Math.random());
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        const speed = 7 + Math.random() * 14;
        const phi = Math.acos(1 - 2 * Math.random());
        const theta = Math.PI * 2 * Math.random();
        velocities.push(new THREE.Vector3(
            speed * Math.sin(phi) * Math.cos(theta),
            speed * Math.sin(phi) * Math.sin(theta),
            speed * Math.cos(phi)
        ));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.6,
        map: createSparkleTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    sparkleBursts.push({
        mesh: particles,
        velocities: velocities,
        life: 1.0
    });
}

function updateClickBursts(delta) {
    for (let i = sparkleBursts.length - 1; i >= 0; i--) {
        const burst = sparkleBursts[i];
        burst.life -= delta * 1.3;

        if (burst.life <= 0) {
            scene.remove(burst.mesh);
            sparkleBursts.splice(i, 1);
            continue;
        }

        const positions = burst.mesh.geometry.attributes.position.array;
        for (let j = 0; j < burst.velocities.length; j++) {
            const vel = burst.velocities[j];
            positions[j * 3] += vel.x * delta;
            positions[j * 3 + 1] += vel.y * delta;
            positions[j * 3 + 2] += vel.z * delta;

            vel.multiplyScalar(0.93);
        }

        burst.mesh.geometry.attributes.position.needsUpdate = true;
        burst.mesh.material.opacity = burst.life;
    }
}

// Animation Loop (60 FPS)
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Cosmic Zoom Flyby Animation from near to far
    if (zoomAnimation.active) {
        const elapsed = time - zoomAnimation.startTime;
        const progress = Math.min(1.0, elapsed / zoomAnimation.duration);
        // Smooth exponential ease-out
        const ease = 1 - Math.pow(1 - progress, 3.5);

        camera.position.lerpVectors(zoomAnimation.startPos, zoomAnimation.targetPos, ease);
        camera.lookAt(0, 0, 0);

        // Smoothly expand photos from center to orbit radius
        photoMeshes.forEach(mesh => {
            mesh.userData.currentExpansion = THREE.MathUtils.lerp(0.05, 1.0, ease);
            const targetScale = mesh.userData.isBadge ? 1.0 : CONFIG.photoSize;
            const scaleVal = THREE.MathUtils.lerp(0.01, targetScale, ease);
            mesh.scale.set(scaleVal, scaleVal, scaleVal);
        });

        if (progress >= 1.0) {
            zoomAnimation.active = false;
            controls.target.set(0, 0, 0);
            controls.update();
        }
    }

    if (time - lastShootingStarTime > 2.8 + Math.random() * 2.2) {
        spawnShootingStar();
        lastShootingStarTime = time;
    }

    updateShootingStars(delta);
    updateClickBursts(delta);

    // Rotate Central Shape
    if (heartParticles) {
        heartParticles.rotation.y = time * 0.12 * CONFIG.orbitSpeed;
        heartParticles.rotation.z = Math.sin(time * 0.2) * 0.05;

        const sizes = heartGeometry.attributes.size.array;
        const phases = heartGeometry.attributes.phase.array;
        for (let i = 0; i < sizes.length; i++) {
            sizes[i] = (Math.sin(time * 3 + phases[i]) * 0.4 + 0.8) * CONFIG.brightness;
        }
        heartGeometry.attributes.size.needsUpdate = true;
    }

    // Orbit Floating Photos & Badges
    photoMeshes.forEach((mesh) => {
        const speed = (mesh.userData.speedFactor || 1.0) * CONFIG.orbitSpeed;
        const angle = mesh.userData.angleOffset + time * 0.15 * speed;
        const expansion = mesh.userData.currentExpansion !== undefined ? mesh.userData.currentExpansion : 1.0;
        const radius = mesh.userData.radiusOffset * (CONFIG.orbitRadius / 28) * expansion;

        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = (mesh.userData.yOffset + Math.sin(time * 1.5 + mesh.userData.angleOffset) * 0.8) * expansion;

        mesh.lookAt(camera.position);

        if (!zoomAnimation.active) {
            const baseScale = mesh.userData.isBadge ? 1.0 : CONFIG.photoSize;
            mesh.scale.set(baseScale, baseScale, baseScale);
        }
    });

    if (starField) {
        starField.rotation.y = time * 0.02;
    }

    // Rotate Meteorite Belts
    const meteorDir = CONFIG.rotationDir === 'same' ? 1 : -1;
    if (meteoriteRing1) {
        meteoriteRing1.rotation.y = time * 0.22 * CONFIG.meteorSpeed * meteorDir;
    }
    if (meteoriteRing2) {
        meteoriteRing2.rotation.y = -time * 0.16 * CONFIG.meteorSpeed * meteorDir;
    }

    if (!zoomAnimation.active) {
        controls.update();
    }
    renderer.render(scene, camera);
}

// UI Event Listeners
function initEvents() {
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Raycast Photo & Badge Click
    window.addEventListener('click', (event) => {
        if (event.target.closest('.hud-header, .control-panel, .modal, .toast-container')) return;

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(photoMeshes);

        if (intersects.length > 0) {
            const hit = intersects[0].object;
            const photoModal = document.getElementById('photo-modal');
            const photoWrapper = document.getElementById('modal-photo-wrapper');
            const badgeCard = document.getElementById('modal-badge-card');
            const modalImg = document.getElementById('modal-img');
            const modalBadgeText = document.getElementById('modal-badge-text');
            const modalTitle = document.getElementById('modal-title');

            if (hit.userData.isPhoto && hit.userData.src) {
                if (photoWrapper) photoWrapper.style.display = 'block';
                if (badgeCard) badgeCard.style.display = 'none';
                if (modalImg) modalImg.src = hit.userData.src;
                if (modalTitle) modalTitle.innerText = hit.userData.caption || "Kỷ Niệm Tình Yêu 💖";
                if (photoModal) photoModal.classList.add('open');
            } else if (hit.userData.isBadge) {
                if (photoWrapper) photoWrapper.style.display = 'none';
                if (badgeCard) badgeCard.style.display = 'flex';
                if (modalBadgeText) modalBadgeText.innerText = `"${hit.userData.text}"`;
                if (modalTitle) modalTitle.innerText = "Thông Điệp Vũ Trụ ✨";
                if (photoModal) photoModal.classList.add('open');
            }
        } else {
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const targetPoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, targetPoint);
            spawnClickBurst(targetPoint);
        }
    });

    // Image Upload Input
    const uploadInput = document.getElementById('image-upload-input');
    if (uploadInput) {
        uploadInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (files.length > 0) {
                files.forEach(file => addCustomPhoto(file));
                uploadInput.value = '';
            }
        });
    }

    // Google Sheet Sync Modal
    const sheetSyncBtn = document.getElementById('sheet-sync-btn');
    const sheetModal = document.getElementById('sheet-modal');
    const closeSheetModal = document.getElementById('close-sheet-modal');
    const loadSheetBtn = document.getElementById('load-sheet-btn');
    const sheetIdInput = document.getElementById('sheet-id-input');
    const rowIdInput = document.getElementById('row-id-input');
    const copySaEmailBtn = document.getElementById('copy-sa-email-btn');

    if (copySaEmailBtn) {
        copySaEmailBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(SERVICE_ACCOUNT.client_email).then(() => {
                showToast("Đã sao chép Email Service Account! 📋", "success");
            }).catch(() => {
                showToast(SERVICE_ACCOUNT.client_email, "normal");
            });
        });
    }

    if (sheetSyncBtn && sheetModal) {
        sheetSyncBtn.addEventListener('click', () => sheetModal.classList.add('open'));
        if (closeSheetModal) {
            closeSheetModal.addEventListener('click', () => sheetModal.classList.remove('open'));
        }

        sheetModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') || e.target === sheetModal) {
                sheetModal.classList.remove('open');
            }
        });

        const handleLoadSheet = async () => {
            const val = sheetIdInput ? sheetIdInput.value.trim() : '';
            const rowVal = rowIdInput ? rowIdInput.value.trim() : null;

            if (!val) {
                showToast("Vui lòng nhập Google Sheet ID hoặc Link!", "error");
                return;
            }
            loadSheetBtn.disabled = true;
            loadSheetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tải dữ liệu API...';

            const success = await loadGoogleSheetData(val, rowVal || null);
            loadSheetBtn.disabled = false;
            loadSheetBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Tải Dữ Liệu Qua API';

            if (success) {
                sheetModal.classList.remove('open');
            }
        };

        if (loadSheetBtn) loadSheetBtn.addEventListener('click', handleLoadSheet);
        if (sheetIdInput) {
            sheetIdInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleLoadSheet();
            });
        }
        if (rowIdInput) {
            rowIdInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleLoadSheet();
            });
        }
    }

    // Add Custom Text Modal
    const addTextBtn = document.getElementById('add-text-btn');
    const textModal = document.getElementById('text-modal');
    const closeTextModal = document.getElementById('close-text-modal');
    const submitTextBtn = document.getElementById('submit-text-btn');
    const customTextInput = document.getElementById('custom-text-input');

    if (addTextBtn && textModal) {
        addTextBtn.addEventListener('click', () => {
            textModal.classList.add('open');
            if (customTextInput) customTextInput.focus();
        });

        if (closeTextModal) {
            closeTextModal.addEventListener('click', () => textModal.classList.remove('open'));
        }

        const handleAddText = () => {
            const text = customTextInput ? customTextInput.value : '';
            if (text && text.trim()) {
                addCustomText(text);
                if (customTextInput) customTextInput.value = '';
                textModal.classList.remove('open');
            } else {
                showToast("Vui lòng nhập lời chúc trước!", "error");
            }
        };

        if (submitTextBtn) submitTextBtn.addEventListener('click', handleAddText);
        if (customTextInput) {
            customTextInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') handleAddText();
            });
        }

        textModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') || e.target === textModal) {
                textModal.classList.remove('open');
            }
        });
    }

    // Photo Modal Close
    const photoModal = document.getElementById('photo-modal');
    const closePhotoModal = document.getElementById('close-photo-modal');
    if (closePhotoModal && photoModal) {
        closePhotoModal.addEventListener('click', () => photoModal.classList.remove('open'));
        photoModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') || e.target === photoModal) {
                photoModal.classList.remove('open');
            }
        });
    }

    // Drawer Settings Toggle
    const settingsBtn = document.getElementById('settings-toggle-btn');
    const controlPanel = document.getElementById('control-panel');
    const closePanelBtn = document.getElementById('close-panel-btn');

    if (settingsBtn && controlPanel) {
        settingsBtn.addEventListener('click', () => controlPanel.classList.toggle('open'));
    }
    if (closePanelBtn && controlPanel) {
        closePanelBtn.addEventListener('click', () => controlPanel.classList.remove('open'));
    }

    // Audio Toggle with Ambient Web Audio Fallback
    const audioBtn = document.getElementById('audio-toggle-btn');
    const bgAudio = document.getElementById('bg-music');

    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            if (!isAudioPlaying) {
                if (bgAudio) {
                    bgAudio.play().then(() => {
                        isAudioPlaying = true;
                        audioBtn.classList.add('active');
                        showToast("Đang phát nhạc lofi không gian 🎵", "success");
                    }).catch(() => {
                        startFallbackChimes();
                        isAudioPlaying = true;
                        audioBtn.classList.add('active');
                        showToast("Đang phát âm thanh tinh vân lãng mạn 🎶", "success");
                    });
                } else {
                    startFallbackChimes();
                    isAudioPlaying = true;
                    audioBtn.classList.add('active');
                }
            } else {
                if (bgAudio) bgAudio.pause();
                stopFallbackChimes();
                isAudioPlaying = false;
                audioBtn.classList.remove('active');
                showToast("Đã tạm dừng nhạc 🔇");
            }
        });
    }

    // Sliders
    const orbitSpeedSlider = document.getElementById('orbit-speed');
    if (orbitSpeedSlider) {
        orbitSpeedSlider.addEventListener('input', (e) => {
            CONFIG.orbitSpeed = parseFloat(e.target.value);
            const valEl = document.getElementById('speed-val');
            if (valEl) valEl.innerText = CONFIG.orbitSpeed.toFixed(1) + 'x';
        });
    }

    const meteorSpeedSlider = document.getElementById('meteor-speed');
    if (meteorSpeedSlider) {
        meteorSpeedSlider.addEventListener('input', (e) => {
            CONFIG.meteorSpeed = parseFloat(e.target.value);
            const valEl = document.getElementById('meteor-speed-val');
            if (valEl) valEl.innerText = CONFIG.meteorSpeed.toFixed(1) + 'x';
        });
    }

    const orbitRadiusSlider = document.getElementById('orbit-radius');
    if (orbitRadiusSlider) {
        orbitRadiusSlider.addEventListener('input', (e) => {
            CONFIG.orbitRadius = parseFloat(e.target.value);
            const valEl = document.getElementById('radius-val');
            if (valEl) valEl.innerText = CONFIG.orbitRadius;
        });
    }

    const photoSizeSlider = document.getElementById('photo-size');
    if (photoSizeSlider) {
        photoSizeSlider.addEventListener('input', (e) => {
            CONFIG.photoSize = parseFloat(e.target.value);
            const valEl = document.getElementById('size-val');
            if (valEl) valEl.innerText = CONFIG.photoSize.toFixed(1) + 'x';
        });
    }

    const brightnessSlider = document.getElementById('sparkle-brightness');
    if (brightnessSlider) {
        brightnessSlider.addEventListener('input', (e) => {
            CONFIG.brightness = parseFloat(e.target.value);
            const valEl = document.getElementById('brightness-val');
            if (valEl) valEl.innerText = CONFIG.brightness.toFixed(1) + 'x';
        });
    }

    // Central Shape Buttons
    document.querySelectorAll('.shape-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            CONFIG.shape = btn.dataset.shape;
            createSparklingHeart();
            showToast(`Đã chuyển sang hình: ${btn.innerText.trim()} ✨`);
        });
    });

    // Meteorite Belt Mode Buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            CONFIG.meteorBeltMode = btn.dataset.belt;
            createMeteoriteRings();
        });
    });

    // Rotation Direction Buttons
    document.querySelectorAll('.dir-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.dir-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            CONFIG.rotationDir = btn.dataset.dir;
        });
    });

    // Color Theme Buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            CONFIG.theme = btn.dataset.theme;
            createSparklingHeart();
            createMeteoriteRings();
            showToast(`Đã đổi tông màu: ${btn.title || CONFIG.theme} 🎨`);
        });
    });

    // Reset Defaults
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            CONFIG.orbitSpeed = 0.5;
            CONFIG.meteorSpeed = 0.5;
            CONFIG.meteorBeltMode = '1';
            CONFIG.rotationDir = 'reverse';
            CONFIG.shape = 'sphere';
            CONFIG.orbitRadius = 28;
            CONFIG.photoSize = 1.0;
            CONFIG.brightness = 1.0;
            CONFIG.theme = 'pink';

            document.querySelectorAll('.shape-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.shape === 'sphere');
            });

            document.querySelectorAll('.mode-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.belt === '1');
            });

            document.querySelectorAll('.dir-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.dir === 'reverse');
            });

            document.querySelectorAll('.color-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.theme === 'pink');
            });

            if (orbitSpeedSlider) orbitSpeedSlider.value = 0.5;
            if (meteorSpeedSlider) meteorSpeedSlider.value = 0.5;
            if (orbitRadiusSlider) orbitRadiusSlider.value = 28;
            if (photoSizeSlider) photoSizeSlider.value = 1.0;
            if (brightnessSlider) brightnessSlider.value = 1.0;

            const spVal = document.getElementById('speed-val');
            if (spVal) spVal.innerText = '0.5x';
            const mspVal = document.getElementById('meteor-speed-val');
            if (mspVal) mspVal.innerText = '0.5x';
            const radVal = document.getElementById('radius-val');
            if (radVal) radVal.innerText = '28';
            const szVal = document.getElementById('size-val');
            if (szVal) szVal.innerText = '1.0x';
            const brVal = document.getElementById('brightness-val');
            if (brVal) brVal.innerText = '1.0x';

            createSparklingHeart();
            createMeteoriteRings();
            clearOrbitItems();
            triggerCosmicZoomAnimation();
            showToast("Đã khôi phục cài đặt mặc định 💫");
        });
    }
}

// Gentle Ambient Chime Synthesizer
function startFallbackChimes() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const chords = [
        [261.63, 329.63, 392.00, 523.25], // C Major
        [220.00, 261.63, 329.63, 440.00], // A Minor
        [174.61, 220.00, 261.63, 349.23], // F Major
        [196.00, 246.94, 293.66, 392.00]  // G Major
    ];
    let chordIdx = 0;
    let noteIdx = 0;

    stopFallbackChimes();

    chimeInterval = setInterval(() => {
        if (!isAudioPlaying || !audioCtx) return;
        
        const currentChord = chords[chordIdx % chords.length];
        const freq = currentChord[noteIdx % currentChord.length];

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 3.2);

        noteIdx++;
        if (noteIdx % 4 === 0) {
            chordIdx++;
        }
    }, 600);
}

function stopFallbackChimes() {
    if (chimeInterval) {
        clearInterval(chimeInterval);
        chimeInterval = null;
    }
}