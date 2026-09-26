// Tombol audio: nyala/mati musik latar (isi src di index.html dulu)
const audioBtn = document.getElementById('audioBtn');
const bgAudio = document.getElementById('bgAudio');

audioBtn.addEventListener('click', () => {
  if (!bgAudio.src) {
    alert('Tambahkan file musik di assets/, lalu aktifkan <source> pada tag <audio> di index.html.');
    return;
  }
  if (bgAudio.paused) {
    bgAudio.play();
    audioBtn.classList.add('playing');
    audioBtn.setAttribute('aria-pressed', 'true');
    audioBtn.querySelector('.lbl').textContent = 'Pause';
  } else {
    bgAudio.pause();
    audioBtn.classList.remove('playing');
    audioBtn.setAttribute('aria-pressed', 'false');
    audioBtn.querySelector('.lbl').textContent = 'Audio';
  }
});

// Tombol "Gas, Buka Undangan" — pindah dari cover ke screen aplikasi (Info, Konfirmasi, dll)
const coverCard = document.querySelector('main.card');
const appScreen = document.getElementById('appScreen');

document.getElementById('openInvite').addEventListener('click', () => {
  coverCard.hidden = true;
  appScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Bottom nav: switch antar tab (Info, Konfirmasi, Kursi, Lokasi, Rundown, Tutorial)
const navBtns = document.querySelectorAll('.nav-btn');
const panels = document.querySelectorAll('.tab-panel');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    panels.forEach(p => { p.hidden = p.dataset.panel !== target; });
    document.querySelector('.app').scrollTo?.({ top: 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// RSVP: pilihan Hadir / Tidak Bisa Hadir
const rsvpStorageKey = 'undangan-wisuda-rsvp';
const rsvpButtons = document.querySelectorAll('.rsvp-choice .chip-btn');
const rsvpListEl = document.getElementById('rsvpList');
const guestNameInput = document.getElementById('guestName');
const guestCountInput = document.getElementById('guestCount');
let selectedRsvpStatus = 'hadir';

function getSavedRsvpList() {
  try {
    return JSON.parse(localStorage.getItem(rsvpStorageKey) || '[]');
  } catch (error) {
    return [];
  }
}

function saveRsvpList(list) {
  try {
    localStorage.setItem(rsvpStorageKey, JSON.stringify(list));
  } catch (error) {
    console.warn('Tidak bisa menyimpan ke localStorage:', error);
  }
}

function updateRsvpSelection(status) {
  selectedRsvpStatus = status;
  rsvpButtons.forEach((button) => {
    const isActive = button.dataset.status === status;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderRsvpList() {
  const list = getSavedRsvpList();
  const hadir = list.filter((item) => item.status === 'hadir');
  const tidakHadir = list.filter((item) => item.status === 'tidak-hadir');

  document.querySelector('[data-count="hadir"]').textContent = hadir.length;
  document.querySelector('[data-count="tidak-hadir"]').textContent = tidakHadir.length;

  const renderGroup = (title, items, isHadir) => {
    const statusLabel = isHadir ? '✅ Hadir' : '❌ Tidak Bisa Hadir';
    const content = items.length
      ? `<ul>${items.map((item) => `<li>${item.name}${item.guests > 1 ? ` (${item.guests} orang)` : ''}</li>`).join('')}</ul>`
      : '<p class="rsvp-empty">Belum ada yang memilih ini.</p>';

    return `
      <div class="rsvp-group">
        <h4>${statusLabel}</h4>
        ${content}
      </div>
    `;
  };

  rsvpListEl.innerHTML = `${renderGroup('Hadir', hadir, true)}${renderGroup('Tidak Hadir', tidakHadir, false)}`;
}

rsvpButtons.forEach((button) => {
  button.addEventListener('click', () => {
    updateRsvpSelection(button.dataset.status);
  });
});

document.getElementById('sendRsvp')?.addEventListener('click', () => {
  const name = guestNameInput.value.trim();
  const countValue = Number(guestCountInput.value || 1);

  if (!name) {
    alert('Isi nama lengkap terlebih dahulu ya.');
    guestNameInput.focus();
    return;
  }

  const list = getSavedRsvpList();
  list.unshift({
    id: Date.now().toString(),
    name,
    guests: Math.min(Math.max(countValue, 1), 3),
    status: selectedRsvpStatus,
    createdAt: new Date().toISOString()
  });

  saveRsvpList(list);
  renderRsvpList();

  guestNameInput.value = '';
  guestCountInput.value = '';
  updateRsvpSelection('hadir');

  alert(`Terima kasih, ${name}! Konfirmasi ${selectedRsvpStatus === 'hadir' ? 'hadir' : 'tidak hadir'} sudah tercatat.`);
});

renderRsvpList();
updateRsvpSelection(selectedRsvpStatus);

document.getElementById('searchSeat')?.addEventListener('click', () => {
  // Sambungkan ke data wisudawan/i (misal dari Google Sheets / database) di sini
  alert('Sambungkan pencarian ini ke data nomor kursi wisudawan/i kamu.');
});
