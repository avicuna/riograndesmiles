export default function GoogleMap() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3263.5!2d-106.7256!3d35.1095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87220b8edfa2b0f1%3A0x5c7b0ea8c8f1a0a!2s3200+Coors+Blvd+NW+%23F%2C+Albuquerque%2C+NM+87120!5e0!3m2!1sen!2sus"
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: '380px' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Rio Grande Smiles office location map"
    />
  );
}
