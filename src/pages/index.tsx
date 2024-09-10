import CalendarMessage from "@/components/ui/CalendarMessage";
import SmsForm from "@/components/ui/SmsForm";
import ChartMessage from "@/components/ui/ChartMessage";
export default function Home() {
  return (
    <>
      <SmsForm />
      <CalendarMessage />
      <ChartMessage />
    </>
  );
}
