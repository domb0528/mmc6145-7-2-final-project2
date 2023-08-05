import styles from './style.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Made Using the <a href="https://spoonacular.com/food-api/">Spoonacular Nutrient Recipe API</a>
    </footer>
  )
}