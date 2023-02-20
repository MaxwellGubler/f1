
export default async (req, res) => {
	
	if (!req.query.subscriberUUID) {
		return res.status(400).json({
			success: false,
			message: "No email defined."
		});
	}
	
	const config = await import(`../../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	
	let subscriberUUID = req.query.subscriberUUID;
	
	const response = await fetch('https://api.novu.co/v1/topics/reminder/subscribers/removal', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_API}`,
	  },
	  body: JSON.stringify({
		subscribers: [subscriberUUID]
	  }),
	});
	
	const data = await response.json();
		
	return res.status(200).json({success:true});
}