function Card ({ children, modifiers }) {
  return (
    <div className={`flex flex-col bg-white p-6 text-black rounded-lg ${modifiers}`}>
      {children}
    </div>
  )
}

export default Card;