import MessageCalendar from "@/components/ui/MessageCalendar";
import SmsForm from "@/components/ui/SmsForm";
import ChartMessage from "@/components/ui/ChartMessage";
export default function Home() {
  return (
    <>
      <SmsForm />
      <MessageCalendar />
      <ChartMessage />
    </>
  );
}
