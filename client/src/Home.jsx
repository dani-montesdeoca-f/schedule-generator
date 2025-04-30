import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"

export default function Home() {
    const [ingredients, setIngredients] = React.useState(
        ["Python", "Data structures and algorithms", "React", "Java", "AWS"]
    )
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const res = await fetch('http://localhost:5000/api/mistral-recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients })
        });
    
        const data = await res.json();
        setRecipe(data.recipe);
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. Algorithms"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add Study Block</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}