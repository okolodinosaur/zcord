# Используем официальный Node.js образ
FROM node:14

# Установка рабочей директории
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Компилируем TypeScript
RUN npm run build

# Указываем команду для запуска сервера
CMD ["node", "dist/index.js"]

# Открываем порт 8080
EXPOSE 8080
