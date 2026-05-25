(function () {
  var messages = {
    en: {
      working: 'Saving your details...',
      success: 'Thanks! Your PDF download is starting.',
      first: 'Please enter your first name.',
      email: 'Please enter a valid email.',
      error: 'Sorry, the download could not start. Please try again.',
    },
    fr: {
      working: 'Enregistrement en cours...',
      success: 'Merci ! Le telechargement du PDF va demarrer.',
      first: 'Entre ton prenom.',
      email: 'Entre un email valide.',
      error: 'Desole, le telechargement ne peut pas demarrer. Reessaie.',
    },
    de: {
      working: 'Daten werden gespeichert...',
      success: 'Danke! Dein PDF-Download startet gleich.',
      first: 'Bitte gib deinen Vornamen ein.',
      email: 'Bitte gib eine gueltige E-Mail-Adresse ein.',
      error: 'Der Download konnte nicht gestartet werden. Bitte versuche es erneut.',
    },
    es: {
      working: 'Guardando tus datos...',
      success: 'Gracias. La descarga del PDF va a comenzar.',
      first: 'Introduce tu nombre.',
      email: 'Introduce un email valido.',
      error: 'No se pudo iniciar la descarga. Intentalo de nuevo.',
    },
  };

  function getLang(form) {
    return (form.getAttribute('data-language') || document.documentElement.lang || 'en')
      .slice(0, 2)
      .toLowerCase();
  }

  function getMessage(form, key) {
    var lang = getLang(form);
    return (messages[lang] || messages.en)[key];
  }

  function setStatus(form, type, text) {
    var status = form.querySelector('.lead-form-status');
    if (!status) return;
    status.className = 'lead-form-status ' + (type ? 'freebie-' + type : '');
    status.textContent = text;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function markPopupClosed(form) {
    if (form.closest('#popup')) {
      localStorage.setItem('popupClosed', 'true');
    }
  }

  async function submitFreebie(form, event) {
    event.preventDefault();

    var firstName = form.elements.firstName ? form.elements.firstName.value.trim() : '';
    var email = form.elements.email ? form.elements.email.value.trim() : '';
    var button = form.querySelector('button[type="submit"]');

    if (firstName.length < 2) {
      setStatus(form, 'error', getMessage(form, 'first'));
      return;
    }

    if (!isValidEmail(email)) {
      setStatus(form, 'error', getMessage(form, 'email'));
      return;
    }

    if (button) button.disabled = true;
    setStatus(form, '', getMessage(form, 'working'));

    try {
      var response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: firstName,
          email: email,
          lang: getLang(form),
          freebie: form.getAttribute('data-freebie') || 'HEROINKY',
          download: form.getAttribute('data-download') || '',
          source: form.getAttribute('data-source') || 'freebie-form',
          page: window.location.href,
        }),
      });
      var data = await response.json().catch(function () {
        return {};
      });

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Subscribe failed');
      }

      setStatus(form, 'success', getMessage(form, 'success'));
      markPopupClosed(form);

      window.setTimeout(function () {
        window.location.assign(form.getAttribute('data-download') || '/Free_Heroinky.pdf');
      }, 600);
    } catch (error) {
      setStatus(form, 'error', getMessage(form, 'error'));
      if (button) button.disabled = false;
    }
  }

  document.addEventListener('submit', function (event) {
    var form = event.target.closest('.freebie-form');
    if (form) submitFreebie(form, event);
  });

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-freebie-popup]');
    if (!trigger) return;

    event.preventDefault();
    var popupId = trigger.getAttribute('data-freebie-popup') || 'popup';
    var popup = document.getElementById(popupId);
    if (popup) popup.classList.add('active');
  });
})();
