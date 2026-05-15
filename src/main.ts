import './style.css';

// 1. Находим корневой элемент и заменяем его на Canvas
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <canvas id="game-canvas" width="800" height="600"></canvas>
`;

// 2. Получаем доступ к Canvas и контексту рисования
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// 3. Устанавливаем размеры Canvas (можно потом сделать адаптивным)
canvas.width = 800;
canvas.height = 600;

// 4. Интерфейс для движущегося объекта (наш метеорит)
interface MovingObject {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
}

// 5. Создаём метеорит
const meteor: MovingObject = {
  x: 100,
  y: 100,
  radius: 15,
  speedX: 2,
  speedY: 1.5,
  color: '#ff6600',
};

// 6. Функция рисования звёзд (статический фон)
function drawStars() {
  for (let i = 0; i < 100; i++) {
    if (Math.random() > 0.98) { // рисуем только 2% звёзд за кадр, но так как кадров много — все появятся быстро
      const starX = Math.random() * canvas.width;
      const starY = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
      ctx.beginPath();
      ctx.arc(starX, starY, Math.random() * 2 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// 7. Функция рисования метеорита
function drawMeteor() {
  ctx.beginPath();
  ctx.arc(meteor.x, meteor.y, meteor.radius, 0, Math.PI * 2);
  ctx.fillStyle = meteor.color;
  ctx.fill();
  ctx.closePath();
}

// 8. Обновление позиции метеорита
function updateMeteor() {
  meteor.x += meteor.speedX;
  meteor.y += meteor.speedY;
  
  // Отражение от границ
  if (meteor.x + meteor.radius > canvas.width || meteor.x - meteor.radius < 0) {
    meteor.speedX = -meteor.speedX;
  }
  if (meteor.y + meteor.radius > canvas.height || meteor.y - meteor.radius < 0) {
    meteor.speedY = -meteor.speedY;
  }
}

// 9. Главная функция анимации
function animate() {
  // Очищаем весь холст
  ctx.fillStyle = '#0a0f2a'; // тёмно-синий космос
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Рисуем звёзды
  drawStars();
  
  // Обновляем и рисуем метеорит
  updateMeteor();
  drawMeteor();
  
  // Запрашиваем следующий кадр
  requestAnimationFrame(animate);
}

// 10. Запускаем анимацию
animate();
