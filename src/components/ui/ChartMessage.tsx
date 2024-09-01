import React, { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

// Типы для сообщений и данных графика
interface Message {
  id: number;
  received_at: string;
}

interface ChartData {
  time: string; // дата в формате YYYY-MM-DD
  sms: number; // количество сообщений
}

// Конфигурация графика
const chartConfig = {
  sms: {
    label: "sms",
    color: "#2563eb",
  },
};

const ChartMessage: React.FC = () => {
  // Состояние для данных графика
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Получение данных при монтировании компонента
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          throw new Error(`Error fetching messages: ${response.statusText}`);
        }
        const data: Message[] = await response.json();
        updateChartData(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData();
  }, []);

  // Функция для обновления данных графика
  const updateChartData = (data: Message[]): void => {
    const today = new Date();
    const counts: Record<string, number> = {};

    // Генерация диапазона дат для графика
    for (let i = -2; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0]; // Преобразование даты в строку YYYY-MM-DD
      counts[dateString] = 0; // Инициализация счетчика для каждой даты
    }

    // Подсчет количества сообщений по датам
    data.forEach((msg) => {
      const msgDate = msg.received_at.split("T")[0];
      if (counts.hasOwnProperty(msgDate)) {
        counts[msgDate]++;
      }
    });

    // Создание данных для графика из счетчиков
    const newChartData: ChartData[] = Object.keys(counts).map((key) => ({
      time: key,
      sms: counts[key],
    }));

    setChartData(newChartData);
  };

  // Отрисовка компонента
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="time" />
          <Tooltip />
          <Bar dataKey="sms" fill={chartConfig.sms.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartMessage;
