import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Notes.css';


const Slideshow = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [images]);


    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: -1,
            }}
        >
            {images.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={`slide-${index}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: index === currentImageIndex ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: index === currentImageIndex ? 1 : 0,
                    }}
                />
            ))}
        </div>
    );
};




const Notes = ({ images }) => {
    const [date, setDate] = useState("");
    const [id, setId] = useState("");
    const [notes, setNotes] = useState([]);
    const [words, setWords] = useState("");
    const [btntext, setBtnText] = useState("Add");
    const [filteredoption, setFilteredOption] = useState("All");


    const getNote = async () => {
        const url = `http://localhost:3000/Notes`;
        let result = await fetch(url)
        result = await result.json();
        if (result) {
            setNotes(result);
        }
    }

    useEffect(() => {
        getNote();
    },[filteredoption])

    const addNote = async () => {
        if (btntext === "Add") {
            const url = `http://localhost:3000/Notes`;
            let result = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                    words: words,
                    date: date
                }),
                headers: {
                    'content-type': "application/json"
                }
            })
            result = await result.json();
            if (result) {
                alert("note is successfully added !");
                getNote();
                resetForm();
            }
        }
        else {
            const url = `http://localhost:3000/Notes/`;
            let result = await fetch(url + id, {
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                    words: words,
                    date: date
                }),
                headers: {
                    'content-type': "application/json"
                }
            })
            result = await result.json();
            if (result) {
                alert("Note is successfully updated !");
                getNote();
                resetForm();
            }
            else {
                console.log(Error.message);
            }
        }
    }

    const editNote = (note) => {
        setId(note.id)
        setWords(note.words)
        setDate(note.date)
        setBtnText("Update");
    }

    const deleteNote = async (id) => {
        if (window.confirm("Are you sure ?")) {
            const url = `http://localhost:3000/Notes`;
            let result = await fetch(`${url}/${id}`, {
                method: "DELETE",
            })
            result = await result.json();
            if (result) {
                alert("Note is successfully Deleted !");
                getNote();
                resetForm();
            }
        }

    }

    const resetForm = () => {
        setWords("");
        setDate("");
        setId("");
    }

    const filteredNotes = notes.filter((noted) =>{
        const noteDate = new Date(noted.date);
        const noteMonth = noteDate.toLocaleString('default', { month :'long'});
        switch (filteredoption) {
            case 'all':
                return true;
            default:
                return noteMonth.toLowerCase() === filteredoption.toLowerCase();
        }
    })

    return (
        <>
            <Slideshow images={images} />
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card styled-col" id="list1" style={{ borderRadius: "0.75rem", backgroundColor: "#eff1f2" }}>
                                <div className="card-body py-4 px-4 px-md-5">
                                    <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                                        <i className="fa fa-check-square me-1"></i>
                                        <u className="text-decoration-none">Things that need to be done</u>
                                    </p>

                                    <div className="pb-2">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex flex-row align-items-center">
                                                    <input type="text" className="form-control form-control-sm" id="FormControlInputId" value={id}
                                                        placeholder="S.No" onChange={(e) => setId(e.target.value)} />
                                                    <input type="text" className="form-control form-control-lg" id="FormControlInputNote"
                                                        placeholder="Add new note.." value={words} onChange={(e) => setWords(e.target.value)} />
                                                    <Link to="" data-mdb-toggle="tooltip" title="Set due date"><i
                                                        className="fa fa-calendar fa-lg me-3"></i></Link>
                                                    <input type="date" className="form-control form-control-sm" id="FormControlInputDate" value={date}
                                                        onChange={(e) => setDate(e.target.value)} placeholder="DD-MM-YY" />
                                                    <div>
                                                        <input type="button" className="btn btn-outline-primary me-2" value={btntext} onClick={addNote} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                                        <p className="small mb-0 me-2 text-muted">Filter By Months</p>
                                        <select className="select" value={filteredoption} onChange={(e)=>setFilteredOption(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>

                                        </select>
                                    </div>
                                    <ul className="list-group">
                                        {filteredNotes.map((note) => (
                                            <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="lead fw-normal mb-0">{note.words}</p>
                                                    <small className="text-muted">Created date: {note.date}</small>
                                                </div>
                                                <div>
                                                    <Link to="" className="btn btn-danger me-2" onClick={() => deleteNote(note.id)}>
                                                        <i className="fa fa-trash"></i>
                                                    </Link>
                                                    <Link to="" className="btn btn-outline-info" onClick={() => editNote(note)}>
                                                        <i className="fa fa-pencil"></i>
                                                    </Link>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Notes;