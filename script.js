// --- Variables globales ---
let points = 0;
let tasks = [];

// --- Charger les données depuis le localStorage ---
function loadData() {
  const savedTasks = localStorage.getItem('tasks');
  const savedPoints = localStorage.getItem('points');
  if (savedTasks) tasks = JSON.parse(savedTasks);
  if (savedPoints) points = parseInt(savedPoints);
}

// --- Sauvegarder dans le localStorage ---
function saveData() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('points', points);
}

// --- Ajouter une tâche ---
function addTask() {
  const input = document.getElementById('taskInput');
  if (input.value.trim() !== "") {
    tasks.push({ text: input.value, done: false, bonus: false });
    input.value = "";
    saveData();
    renderTasks();
  }
}

// --- Ajouter le challenge du jour ---
function addDailyChallenge() {
  const challenge = "Challenge du jour : faire 10 pompes 💪";
  tasks.push({ text: challenge, done: false, bonus: true });
  saveData();
  renderTasks();
}

// --- Cocher une tâche ---
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  if (tasks[index].done) {
    points += tasks[index].bonus ? 20 : 10;
  } else {
    points -= tasks[index].bonus ? 20 : 10;
  }
  saveData();
  renderTasks();
  updateScoreAndAvatar();
}

// --- Supprimer une tâche ---
function deleteTask(index) {
  if (tasks[index].done) {
    points -= tasks[index].bonus ? 20 : 10;
  }
  tasks.splice(index, 1);
  saveData();
  renderTasks();
  updateScoreAndAvatar();
}

// --- Afficher les tâches ---
function renderTasks() {
  const list = document.getElementById('tasks');
  list.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${i})">
      <span style="${task.done ? 'text-decoration:line-through;' : ''}">${task.text}</span>
      <button onclick="deleteTask(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

// --- Mettre à jour score, avatar, thème et stickers ---
function updateScoreAndAvatar() {
  document.getElementById('score').textContent = 'Points: ' + points;

  const avatarImg = document.getElementById('avatar');
  let themeColor = '#f0f8ff';

  if (points >= 200) {
    avatarImg.src = 'images/avatar5.png';
    themeColor = '#ffdfdf';
  } else if (points >= 150) {
    avatarImg.src = 'images/avatar4.png';
    themeColor = '#ffe6b2';
  } else if (points >= 100) {
    avatarImg.src = 'images/avatar3.png';
    themeColor = '#fff2b2';
  } else if (points >= 50) {
    avatarImg.src = 'images/avatar2.png';
    themeColor = '#d4f4dd';
  } else {
    avatarImg.src = 'images/avatar1.png';
    themeColor = '#f0f8ff';
  }

  document.body.style.backgroundColor = themeColor;

  // Stickers
  let sticker = '';
  if (points >= 30) sticker = '🎉';
  if (points >= 70) sticker = '🏅';
  if (points >= 120) sticker = '🚀';
  if (points >= 180) sticker = '👑';
  document.getElementById('sticker').textContent = sticker;
}

// --- Réinitialiser ---
function resetGame() {
  if (confirm("Voulez-vous vraiment réinitialiser le jeu ?")) {
    tasks = [];
    points = 0;
    saveData();
    renderTasks();
    updateScoreAndAvatar();
  }
}

// --- Mises à jour ---
function addUpdate(text) {
  const updatesList = document.getElementById('updatesList');
  const li = document.createElement('li');
  li.textContent = text;
  updatesList.appendChild(li);
}

// --- Au chargement de la page ---
window.onload = function() {
  loadData();
  if (!tasks.some(t => t.bonus)) addDailyChallenge();
  renderTasks();
  updateScoreAndAvatar();

  // Historique des mises à jour
  addUpdate("Version 1.2.1 : Nouveau design amélioré ✨");
  addUpdate("2 avatar de plus ajouter 😛");
};
