import styles from './BirthdayRSVP.module.css'
import { useRouter } from 'next/router'

function RSVPForm() {
    const { asPath } = useRouter()

    return <form
    className={styles.form}
    name="birthday-rsvp"
    action={asPath + "/?success=true"}
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    >
        <input type="hidden" name="form-name" value="birthday-rsvp" />
        <label>
            Name (required)
            <input name="name" type="text" required />
        </label>
        <label>
            Email
            <input name="email" type="email" />
        </label>
        <fieldset>
            <legend>Attendance</legend>
            <label>
                <input name="attendance" type="radio" value="Brunch + Met visit" />
                Brunch + Met Visit
            </label>
            <label>
                <input name="attendance" type="radio" value="Brunch Only" defaultChecked />
                Brunch Only
            </label>
            <label>
                <input name="attendance" type="radio" value="Met Only" />
                Met Only
            </label>
            <label>
                <input name="attendance" type="radio" value="Cannot Attend" />
                Cannot Attend
            </label>
        </fieldset>
        <fieldset name="diet">
            <legend>Diet Preferences (select as many as apply)</legend>
            <label>
                <input type="checkbox" value="Vegetarian" />
                Vegetarian
            </label>
            <label>
                <input type="checkbox" value="Vegan" />
                Vegan
            </label>
            <label>
                <input type="checkbox" value="Kosher" />
                Kosher
            </label>
            <label>
                <input type="checkbox" value="Non-alcoholic" />
                Non-alcoholic
            </label>
            <label>
                <input type="checkbox" value="Gluten-Free" />
                Gluten-Free
            </label>
            <label>
                <input type="checkbox" value="No Peanuts" />
                No Peanuts
            </label>
            <label>
                <input type="checkbox" value="No Tree Nuts" />
                No Tree Nuts
            </label>
            <label>
                Allergies
                <input type="text" />
            </label>
        </fieldset>
        <label>
            <input type="checkbox" name="soul-pledge" />
            I agree to the terms & conditions; will share my personal data, baby photos, and darkest secrets; and would like to be put on the email list for Frank&apos;s new podcast on the history of chair design. Just kidding this checkbox does nothing.
        </label>
        <p hidden>
            <label>
                Don&apos;t fill this out: <input name="bot-field" />
            </label>
        </p>
        <button type="submit">Submit</button>
    </form>
}

function RSVPConfirmation() {
    return <>
        <h3>Thanks for RSVPing 🎉</h3>
        <p>If you&apos;re able to make it I&apos;m looking forward to seeing you on the 17th, if not I&apos;m looking forward to seeing you when I see you 😊.</p>
    </>
}

export default function BirthdayRSVP() {
    const router = useRouter()
    const confirmationScreenVisible = router.query?.success && router.query.success === "true";

    const formVisible = !confirmationScreenVisible

    return formVisible ? <RSVPForm/> : <RSVPConfirmation/>
}