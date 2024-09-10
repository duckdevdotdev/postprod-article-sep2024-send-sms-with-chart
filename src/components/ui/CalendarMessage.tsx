import React, { useEffect, useState } from "react";
import { Calendar } from "./calendar";

// Определение интерфейса для объекта сообщения
interface Message {
  received_at: string; // Дата получения сообщения в формате строки
  sender_number: string; // Номер телефона отправителя
  recipient_numbers: string; // Строка с номерами получателей
  text: string; // Текст сообщения
}

const CalendarMessage: React.FC = () => {
  // Состояние для хранения текущей выбранной даты
  const [date, setDate] = useState<Date>(new Date());
  // Состояние для хранения списка сообщений
  const [messages, setMessages] = useState<Message[]>([]);

  // useEffect для загрузки данных сообщений из API при монтировании компонента
  useEffect(() => {
    const getMessages = async () => {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(data); // Сохранение полученных данных в состояние messages
    };
    getMessages();
  }, []);

  // Функция для обработки выбора даты в календаре
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate); // Обновление состояния date, если выбрана новая дата
    }
  };

  // Фильтрация сообщений по выбранной дате
  const filteredMessages = messages.filter((message) => {
    const messageDate = new Date(message.received_at).toDateString(); // Преобразование даты сообщения в строку
    return messageDate === date.toDateString(); // Сравнение даты сообщения с выбранной датой
  });

  // Рендер компонента
  return (
    <>
      <div className="w-full flex items-center justify-center">
        <Calendar
          mode="single" // Режим выбора одной даты
          selected={date} // Текущая выбранная дата
          onSelect={handleDateSelect} // Функция, вызываемая при выборе даты
          className="rounded-md border" // Классы стилей для календаря
        />
      </div>
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-lg font-semibold">
          Сообщения за {date.toLocaleDateString()}
        </h2>
        {filteredMessages.length > 0 ? (
          <ul>
            {filteredMessages.map((message, index) => (
              <li key={index} className="mb-2 p-2 border rounded">
                <p>
                  <strong>Номер отправителя:</strong> {message.sender_number}
                </p>
                <p>
                  <strong>Номера получателей:</strong>{" "}
                  {message.recipient_numbers}
                </p>
                <p>
                  <strong>Текст сообщения:</strong> {message.text}
                </p>
                <p>
                  <strong>Получено:</strong>{" "}
                  {new Date(message.received_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет сообщений за этот день.</p> // Сообщение, если нет сообщений за выбранный день
        )}
      </div>
    </>
  );
};

export default CalendarMessage;
