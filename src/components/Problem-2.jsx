import React, { useState, useEffect } from 'react';

const Problem2 = () => {
    const [contacts, setContacts] = useState([]);
    const [showAllModal, setShowAllModal] = useState(false);
    const [showUSModal, setShowUSModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);

    //this didn't worked
    const url = 'https://contact.mediusware.com/api-doc/?format=openapi'

    const openAllContactsModal = async () => {
        setShowAllModal(true);
        setShowUSModal(false);

        try {
            const response = await fetch(url);
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching all contacts:', error);
        }
    };

    const openUSContactsModal = async () => {
        setShowUSModal(true);
        setShowAllModal(false);

        try {
            const response = await fetch(url);
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.error('Error fetching US contacts:', error);
        }
    };

    const closeModals = () => {
        setShowAllModal(false);
        setShowUSModal(false);
        setShowDetailsModal(false);
    };

    const openDetailsModal = () => {
        setShowDetailsModal(true);
    };

    const handleCheckboxChange = (e) => {
        setOnlyEvenChecked(e.target.checked);
    };


    useEffect(() => {

        const fetchFilteredContacts = async () => {
            try {
                const response = await fetch(
                    `https://contact.mediusware.com/api/contacts?onlyEven=${onlyEvenChecked}`
                );
                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching filtered contacts:', error);
            }
        };

        fetchFilteredContacts();
    }, [onlyEvenChecked]);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button onClick={openAllContactsModal} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    <button onClick={openUSContactsModal} className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>
                {/* Modal A: All Contacts */}
                {showAllModal && (
                    <div className="modal">
                        {/* Modal content here */}
                        <button type="button" onClick={openAllContactsModal} style={{ backgroundColor: '#46139f', color: '#fff' }}>
                            Modal Button A
                        </button>
                        <button type="button" onClick={openDetailsModal} style={{ backgroundColor: '#46139f', color: '#fff' }}>
                            Modal Button C
                        </button>
                        <input
                            type="checkbox"
                            id="onlyEvenCheckbox"
                            checked={onlyEvenChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="onlyEvenCheckbox">Only even</label>
                        {/* contact list with infinity scroll and search box */}
                    </div>
                )}

                {/* Modal B: US Contacts */}
                {showUSModal && (
                    <div className="modal">

                        <button type="button" onClick={openUSContactsModal} style={{ backgroundColor: '#ff7f50', color: '#fff' }}>
                            Modal Button B
                        </button>
                        <button type="button" onClick={openDetailsModal} style={{ backgroundColor: '#46139f', color: '#fff' }}>
                            Modal Button C
                        </button>
                        <input
                            type="checkbox"
                            id="onlyEvenCheckbox"
                            checked={onlyEvenChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="onlyEvenCheckbox">Only even</label>
                        {/* contact list with infinity scroll and search box  */}
                    </div>
                )}

                {showDetailsModal && (
                    <div className="modal">

                        <button type="button" onClick={openDetailsModal} style={{ backgroundColor: '#46139f', color: '#fff' }}>
                            Close
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Problem2;