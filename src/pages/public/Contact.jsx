import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import ContactForm from '../../components/forms/ContactForm';

import { buttonStyleDisplay } from '../../layouts/Style.jsx';

export default function Contact() {
	const [formSubmit, setFormSubmit] = useState(false);

	const [contactFirstName, setContactFirstName] = useState('');
	const [contactLastName, setContactLastName] = useState('');
	const [contactEmail, setContactEmail] = useState('');
	const [contactObject, setContactObject] = useState('');
	const [contactMessage, setContactMessage] = useState('');

	const [contactStatus, setContactStatus] = useState('');

	const navigate = useNavigate();

	const clearForm = () => {
		setContactFirstName('');
		setContactLastName('');
		setContactEmail('');
		setContactObject('');
		setContactMessage('');
	};

	const postContact = async (event) => {
		if (formSubmit) return;

		setFormSubmit(true);

		const formData = new FormData(event.target);
		const formJson = Object.fromEntries(formData.entries());

		await emailjs.send('service_wo7twqj', 'template_ttl4s35', formJson, '_7tXBTUeVW0RW_8BR').then(
			(result) => {
				result.status == 200 && setContactStatus('Message envoyé !');
			},
			(error) => {
				console.log(error);
				setContactStatus('Une erreur est survenue, veuillez réessayer ultérieurement.');
			}
		);

		clearForm();
		setTimeout(() => navigate('/'), 2000);
		setFormSubmit(false);
	};

	return (
		<div className='h-full w-full relative overflow-hidden border-4 lg:border-8 border-[#8759B4] rounded-sm lg:px-16 lg:py-12 p-4 bg-zinc-700 flex justify-center'>
			<div className='lg:w-1/2 h-full'>
				<ContactForm
					id='contact'
					firstName={contactFirstName}
					setFirstName={setContactFirstName}
					lastName={contactLastName}
					setLastName={setContactLastName}
					email={contactEmail}
					setEmail={setContactEmail}
					object={contactObject}
					setObject={setContactObject}
					message={contactMessage}
					setMessage={setContactMessage}
					formAction={postContact}
				>
					{contactStatus && (
						<p className='flex items-center justify-center px-4 py-1 border border-transparent rounded font-semibold transition ease-in-out duration-150 text-lg'>
							{contactStatus}
						</p>
					)}

					{!contactStatus && (
						<button type='submit' disabled={formSubmit} className={buttonStyleDisplay}>
							Envoyer
						</button>
					)}
				</ContactForm>
			</div>
		</div>
	);
}
