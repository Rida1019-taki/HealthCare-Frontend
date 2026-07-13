import './Features.css';

const data = [
    {
        title:"Patient Intake",
        text:"Streamline new patient registration with digital forms."
    },
    {
        title:"Health Records",
        text:"Access encrypted medical histories."
    },
    {
        title:"Staff Scheduling",
        text:"Coordinate clinician shifts."
    },
    {
        title:"Telemedicine",
        text:"Conduct secure virtual consultations."
    }
];

function Features(){
    return(
        <section className="features">
            {
                data.map((item, index)=> (
                    <div className="card" key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                    </div>
                ))
            }
        </section>
    );
}
export default Features;