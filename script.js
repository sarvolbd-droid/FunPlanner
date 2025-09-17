let tasks = [];
let points = 0;
let dailyChallenge = generateDailyChallenge();

// --- Sauvegarde et récupération ---
function saveData() {
  const data = { tasks: tasks, points: points };
  localStorage.setItem('funPlannerData', JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('funPlannerData'));
  if(data) {
    tasks = data.tasks || [];
    points = data.points || 0;
  }
}

// --- Générer challenge selon la date ---
function generateDailyChallenge() {
  const challenges = [
    "Boire un verre d'eau",
    "Faire 5 min d'étirements",
    "Écrire 1 page dans ton journal",
    "Complimenter quelqu'un",
    "Ranger ton bureau"
  ];
  const today = new Date();
  const index = (today.getDate() + today.getMonth()) % challenges.length;
  return challenges[index];
}

// --- Ajouter tâche normale ---
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if(taskText === '') return;

  const task = { text: taskText, done: false, bonus: false };
  tasks.push(task);
  input.value = '';
  renderTasks();
  saveData();
}

// --- Ajouter challenge du jour ---
function addDailyChallenge() {
  const task = { text: dailyChallenge, done: false, bonus: true };
  tasks.push(task);
  renderTasks();
  saveData();
}

// --- Cocher/décocher tâche ---
function toggleTask(index) {
  const task = tasks[index];
  task.done = !task.done;

  if(task.bonus) {
    points += task.done ? 30 : -30;
  } else {
    points += task.done ? 10 : -10;
  }

  renderTasks();
  updateScoreAndAvatar();
  saveData();
}

// --- Afficher les tâches ---
function renderTasks() {
  const tasksList = document.getElementById('tasks');
  tasksList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.style.color = task.bonus ? 'red' : 'black';
    li.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''} onclick="toggleTask(${index})"> ${task.text}`;
    tasksList.appendChild(li);
  });
}

// --- Mettre à jour score, avatar, thème et stickers ---
function updateScoreAndAvatar() {
  document.getElementById('score').textContent = 'Points: ' + points;

  const avatarImg = document.getElementById('avatar');
  let themeColor = '#f0f8ff';

  if(points >= 100) {
    avatarImg.src = 'images/avatar3.png';
    themeColor = '#fff2b2';
  } else if(points >= 50) {
    avatarImg.src = 'images/avatar2.png';
    themeColor = '#d4f4dd';
  } else {
    avatarImg.src = 'images/avatar1.png';
    themeColor = '#f0f8ff';
  }

  document.body.style.backgroundColor = themeColor;

  // Stickers
  let sticker = '';
  if(points >= 30) sticker = '🎉';
  if(points >= 70) sticker = '🏅';
  if(points >= 120) sticker = '🚀';
  document.getElementById('sticker').textContent = sticker;
}

// --- Ajouter une mise à jour ---
function addUpdate(text) {
  const updatesList = document.getElementById('updatesList');
  const li = document.createElement('li');
  li.textContent = text;
  updatesList.appendChild(li);
}

// --- Reset complet ---
function resetGame() {
  tasks = [];
  points = 0;
  localStorage.removeItem('funPlannerData');

  document.getElementById('avatar').src = 'images/avatar1.png';
  document.getElementById('sticker').textContent = '';
  document.body.style.backgroundColor = '#f0f8ff';

  renderTasks();
  updateScoreAndAvatar();
  addUpdate("Le jeu a été réinitialisé !");
}

// --- Au chargement de la page ---
window.onload = function() {
  loadData(); 
  if(!tasks.some(t => t.bonus)) addDailyChallenge(); 
  renderTasks();
  updateScoreAndAvatar();

  // Exemples de mises à jour
  addUpdate("Version 1.0 : lancement du FunPlanner");
addUpdate("interface graphique renouveler")
};
