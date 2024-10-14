import FadeDiv from "@/components/ui/FadeDiv";
import Heading from "@/components/ui/Heading";

export default function Home() {
  return (
    <FadeDiv
        className="w-[40vw] text-justify flex flex-col gap-4">
      <div>
        <Heading>Welcome to my portfolio!</Heading>
        {/* About me section */}
        <p>I am a 17-year-old software developer from Poland, Poznań, currently studying programming at Zespół Szkół Komunikacji im. Hipolita Cegielskiego in Poznań. I am actively seeking an internship opportunity to further develop my skills and gain hands-on experience.</p>
      </div>

      <div>
        <Heading variant="2xl">What you will find on this site?</Heading>
        <p>On this site you&apos;ll find a showcase of my programming projects, developed both in my free time and as part of my schoolwork. In addition, you can explore my blog, where I share insights into my programming journey, current learning progress, what i&apos;m doing in life, future plans, and more. I intend to make this site available in both English and Polish.</p>
      </div>
    </FadeDiv>
  );
}
