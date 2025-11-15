{/*images*/}

import MohammedMansoor from "../assets/mohammed-mansoor-transparent-1.png"
import Mukilan from "../assets/mukilan-transparent.png"
import Archana from "../assets/archana-transparent.png"
import Shalini from "../assets/shalini-transparent.png"
import MuhammedBilal from "../assets/muhammed-bilal-transparent-4.png"
import SuhailAhmed from "../assets/suhail-ahmed-transparent-bg.png"
import GrainImg from "../assets/grain.webp"
import IconPatternImg from "../assets/iconpattern.png"

{/*components*/}
import ProfileCard from "../components/ProfileCard"

interface Mentor {
  id: string;
  name: string;
  role: string;
  subRole: string;
  experience: string;
  avatarUrl: string;
}

const mentorsDetails: Mentor[] = [
    { 
      id: "0",
      name: "Mohammed Mansoor", 
      role: "Founder of UserX", 
      subRole: "UX Instructor",
      experience: "30+  Years of experience",
      avatarUrl: MohammedMansoor
     },
    { 
      id: "1",
      name: "Suhail Ahmed", 
      role: "Founder of bizzzup | woooys", 
      subRole: "UX Instructor",
      experience: "10+ Years of experience" ,  
      avatarUrl: SuhailAhmed
    },
    { 
      id: "2",
      name: "Mukilan", 
      role: "Designer at bizzzup", 
      subRole: "UI/UX Designer Instructor | AI Artist",
      experience: "2+ Years of experience" ,
      avatarUrl: Mukilan
    },
    { 
      id: "3",
      name: "Archana", 
      role: "Graphic Designer at bizzzup", 
      subRole: "Graphic Designer | AI Artist",
      experience: "2+ Years of experience" ,
      avatarUrl: Archana
    },
    { 
      id: "4",
      name: "Shalini", 
      role: "Graphic Designer at bizzzup", 
      subRole: "Graphic Design Instructor",
      experience: "3+ Years of experience" ,
      avatarUrl: Shalini
    },
    { 
      id: "5",
      name: "Muhammed Bilal", 
      role: "Software Developer at userX", 
      subRole: "Senior Angular Developer", 
      experience: "8+ Years of experience" ,
      avatarUrl: MuhammedBilal
    },
]

export default function TeamCard() {
  return (
    <div>
        {/* {(() => {
          const mentor = mentorsDetails[0];
          return (
            <div>
              <h2>{mentor.name}</h2>
              <p>{mentor.role}</p>
              <p>{mentor.subRole}</p>
              <p>{mentor.experience}</p>
            </div>
          );
        })()} */}
      <section id="mentors" className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold">Mentors who hire designers</h2>
          {/* <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            { 
             mentorsDetails.map(({ name, role, subRole, experience, avatarUrl }) => (
              <div key={name} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <div className="h-28 rounded-xl bg-neutral-800 border border-white/5">
                  <img src={avatarUrl} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-3 font-semibold">{name ? name : ""}</h3>
                <p className="text-sm text-white/70">{role ? role : ""}</p>
                <p className="text-xs text-white/60 mt-1">{subRole ? subRole : ""}{experience ? ', ' + experience : ""}</p>
              </div>
             ))
            }
          </div> */}

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            { 
             mentorsDetails.map(({ id, name, role, subRole, experience, avatarUrl }) => (
                <ProfileCard
                key={id}
                name={name}
                title={role}
                handle={subRole}
                status={experience}
                showContactButton={false}
                contactText={'Contact Me'}
                avatarUrl={avatarUrl}
                grainUrl={GrainImg}
                iconUrl={IconPatternImg}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              />
            ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}   