let points = 0;
let taskId = 0;

// Ajouter une tâche
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${taskText}
    <button onclick="completeTask(${taskId})">✔</button>
    <button onclick="deleteTask(this)">✖</button>
  `;
  li.setAttribute("data-id", taskId);

  document.getElementById("tasks").appendChild(li);
  input.value = "";
  taskId++;
}

// Compléter une tâche
function completeTask(id) {
  const task = document.querySelector(`li[data-id='${id}']`);
  if (task) {
    task.remove();
    points += 10;
    updateScore();
    logUpdate("Tâche complétée (+10 points)");
  }
}

// Supprimer une tâche
function deleteTask(button) {
  button.parentElement.remove();
  logUpdate("Tâche supprimée");
}

// Challenge du jour
function addDailyChallenge() {
  const challenges = [
    "Faire 20 pompes 💪",
    "Lire 10 pages 📖",
    "Boire 1L d’eau 💧",
    "Faire une balade 🚶",
    "Aider quelqu’un 🤝"
  ];
  const challenge = challenges[Math.floor(Math.random() * challenges.length)];

  const li = document.createElement("li");
  li.innerHTML = `
    ${challenge}
    <button onclick="completeChallenge(this)">✔</button>
  `;
  document.getElementById("tasks").appendChild(li);

  logUpdate("Nouveau challenge ajouté !");
}

// Compléter un challenge
function completeChallenge(button) {
  button.parentElement.remove();
  points += 20;
  updateScore();
  logUpdate("Challenge complété (+20 points)");
}

// Réinitialiser le jeu
function resetGame() {
  document.getElementById("tasks").innerHTML = "";
  document.getElementById("updatesList").innerHTML = "";
  points = 0;
  updateScore();
  logUpdate("Jeu réinitialisé");
}

// Mise à jour du score + avatar
function updateScore() {
  document.getElementById("score").textContent = `Points: ${points}`;
  updateAvatar(points);
}

// Avatar évolutif
function updateAvatar(points) {
  const avatar = document.getElementById("avatar");

  if (points < 30) {
    avatar.src = "images/avatar1.png";
  } else if (points < 70) {
    avatar.src = "images/avatar2.png";
  } else if (points < 120) {
    avatar.src = "images/avatar3.png";
  } else if (points < 200) {
    avatar.src = "images/avatar4.png";
  } else {
    avatar.src = "images/avatar5.png";
  }
}

// Historique des mises à jour
function logUpdate(text) {
  const li = document.createElement("li");
  li.textContent = text;
  document.getElementById("updatesList").prepend(li);
}
