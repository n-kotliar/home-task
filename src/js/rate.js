import { Notify } from 'notiflix';

export async function addExerciseRatingById(id, { email, rate, comment }) {
  const url = `https://your-energy.b.goit.study/api/exercises/${id}/rating`;
  rate = Number(rate);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      rate,
      review: comment,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Rating failed');
  }

  return response.json();
}

const formCloseBtn = document.getElementById('form-close-btn');
const backdrop = document.querySelector('.backdrop');
const backdropForm = document.querySelector('.backdrop-form');
const userEmail = document.querySelector('#user-email');
const userComment = document.getElementById('user-comment');
const formSendBtn = document.querySelector('.form-send-btn');
const ratingWrapper = document.querySelector('.rating-wrapper');
const ratingStarValue = document.querySelector('.rating-star-value');

let exerciseId = null;

const userFeedback = {
  rate: 0,
  email: '',
  comment: '',
};

formSendBtn.disabled = false;


function resetForm() {
  userEmail.value = '';
  userComment.value = '';
  userFeedback.rate = 0;
  userFeedback.comment = '';
  userFeedback.email = '';

  ratingStarValue.textContent = '0.0';

  document.querySelectorAll('.rating-star-icons').forEach(icon => {
    icon.style.fill = 'var(--white-20)';
  });
}

function closeRateModal() {
  backdrop.classList.remove('is-open');
  document.removeEventListener('keydown', onEscCloseRate);

  if (typeof window.reopenExerciseModal === 'function') {
    window.reopenExerciseModal();
    delete window.reopenExerciseModal;
    delete window.lastExercise;
  }
}


function onEscCloseRate(event) {
  if (event.key === 'Escape') {
    closeRateModal();
  }
}

formCloseBtn.addEventListener('click', closeRateModal);

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) closeRateModal();
});

ratingWrapper.addEventListener('click', event => {
  if (!event.target.dataset.id) return;

  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  userFeedback.rate = Number(event.target.dataset.id);

  ratingStarIcons.forEach((icon, index) => {
    icon.style.fill =
      index < userFeedback.rate ? 'var(--star-color)' : 'var(--white-20)';
  });

  ratingStarValue.textContent = `${userFeedback.rate}.0`;
});

export function handlerOpenRate(id) {
  exerciseId = id;
  backdrop.classList.add('is-open');
  document.addEventListener('keydown', onEscCloseRate);
}


backdropForm.addEventListener('submit', handlerAddRate);

async function handlerAddRate(event) {
  event.preventDefault();

  userFeedback.email = userEmail.value.trim();
  userFeedback.comment = userComment.value.trim() || undefined;

  if (!userFeedback.rate) {
    Notify.failure('Please select a rating');
    return;
  }

  if (!userFeedback.email) {
    Notify.failure('Please enter your email');
    return;
  }

  try {
    await addExerciseRatingById(exerciseId, userFeedback);
    Notify.success('Your rating has been saved!');
    resetForm();
    closeRateModal();
  } catch (error) {
    Notify.failure(error.message || 'Something went wrong');
  }
}
