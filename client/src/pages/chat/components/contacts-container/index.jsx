import Logo from "./logo"
import Title from "./title"

const ContactsContainer = () => {


  return (
    <div className='relative w-[35vw] bg-[#1b1c24] border-r-2 border-[#af303b]'>
        <div className="pt-3">
            <Logo />
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between pr-10">
                <Title text={"Direct Messages"}/>
            </div>
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between pr-10">
                <Title text={"Channels"}/>
            </div>
        </div> 
    </div>
  )
}

export default ContactsContainer



  