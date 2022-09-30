import { Metadata } from '@uikit/organisms'

export interface AboutPageProps {}

const AboutPage = ({}: AboutPageProps) => {
  return (
    <>
      <Metadata title="Про енциклопедію" />
      <div className="flex">
        <div className="p-5 rounded-lg my-10 m-auto border border-sky-900">
          <h2 className="font-bold text-center mb-10">Електронна енциклопедія</h2>
          <p>Енциклопедія - це онлайн енциклопедія, що подає загальну інформацію на будь-яку тему.</p>
          <p>В енциклопедії вміщено значну кількість ілюстрацій та посилань на джерела. Енциклопедія містить теги та групи, що значно 
            спрощує пошук статей. А також присутній пошук статей за назвою чи змістом, їх сортування за датою публікації, назвою чи кількістю переглядів. </p>
        </div>
      </div>
    </>
  )
}

export default AboutPage
