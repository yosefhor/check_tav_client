import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


const FAQ = () => {

    const { hash } = useLocation();
    const [showAcc, setShowAcc] = useState(false);

    useEffect(() => {
        if (hash === '#headingFive') {
            setShowAcc(true)
            const element = document.querySelector(hash);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offset = 110 + (window.innerWidth * 3 / 100); // 110px + 3vw
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [hash]);

    return (
        <div className="accordion">
            <h1 className=' mt-5 mb-4 text-purple text-center'>שאלות נפוצות</h1>
            <div className="accordion-item">
                <h3 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        כיצד מגישים בקשה לתו נכה?
                    </button>
                </h3>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        <p>הגשת בקשה לתו נכה מתבצעת דרך משרד התחבורה והבטיחות בדרכים. קיימות שתי אפשרויות עיקריות להגשת הבקשה:</p>
                        <ol>
                            <li><strong>באופן מקוון:</strong> <a href='https://auth.govforms.gov.il/mw/forms/DisabledParkingBadg@mot.gov.il' target='blanc'>דרך המערכת הממשלתית המקוונת באתר משרד התחבורה</a> . זוהי הדרך המהירה והיעילה ביותר.</li>
                            <li><strong>באמצעות דואר:</strong> ניתן לשלוח את הטפסים והמסמכים הנדרשים לכתובת: היחידה למוגבלי ניידות, תא דואר 72, חולון, מיקוד 5810001.</li>
                        </ol>
                        <p>בשני המקרים, יש לצרף לבקשה:</p>
                        <ul>
                            <li>טופס בקשה מלא וחתום.</li>
                            <li>מסמכים רפואיים עדכניים המפרטים את המצב הרפואי והמגבלות התפקודיות.</li>
                        </ul>
                        <p>בהגשה באמצעות הדואר יש לצרף גם:</p>
                        <ul>
                            <li>צילום תעודת זהות כולל ספח.</li>
                            <li>צילום רישיון נהיגה ורישיון רכב (אם יש).</li>
                        </ul>
                        <p>חשוב לציין כי הקריטריון העיקרי הנבחן הוא מידת הפגיעה בניידות. לכן, יש להדגיש במסמכים הרפואיים את הקשיים בהליכה או בתנועה והצורך ברכב לצורך התניידות.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        מי זכאי לתו נכה לרכב?
                    </button>
                </h3>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        <p>הזכאות לתו נכה נקבעת על פי קריטריונים מוגדרים של משרד התחבורה, ולא בהכרח תלויה באחוזי נכות מהביטוח הלאומי. הקבוצות העיקריות הזכאיות לתו נכה כוללות:</p>
                        <ul>
                            <li>אנשים עם מוגבלות פיזית משמעותית המגבילה את ניידותם.</li>
                            <li>אנשים הסובלים מבעיות לבביות חמורות.</li>
                            <li>אנשים עם מוגבלויות נוירולוגיות או אורתופדיות קשות.</li>
                            <li>אנשים עם מחלות כרוניות מסוימות המשפיעות על יכולת הניידות.</li>
                            <li>במקרים מסוימים, אנשים עם מוגבלויות ראייה או שמיעה חמורות.</li>
                        </ul>
                        <p>חשוב לציין כי כל בקשה נבחנת לגופה על ידי ועדה רפואית של משרד התחבורה. גם אם אינכם מוכרים כבעלי אחוזי נכות בביטוח הלאומי, עדיין כדאי לבדוק את זכאותכם לתו חנייה במשרד התחבורה.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        מהן הזכויות והיתרונות של בעלי תו נכה?
                    </button>
                </h3>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        <p>בעלי תו נכה נהנים ממספר זכויות והטבות משמעותיות:</p>
                        <ul>
                            <li><strong>חניה בחניות נכים:</strong> זכות להחנות בחניות המסומנות לנכים במקומות ציבוריים.</li>
                            <li><strong>פטור מתשלום חניה:</strong> במקומות ציבוריים רבים, כולל חניונים עירוניים ומסחריים.</li>
                            <li><strong>חניה במקומות מוגבלים:</strong> אפשרות לחנות במקומות בהם החניה מוגבלת בזמן או אסורה לרכבים רגילים, בכפוף לתנאים מסוימים.</li>
                            <li><strong>נסיעה בנתיבי תחבורה ציבורית:</strong> בעלי תג נכה כחול עם סמל כיסא גלגלים רשאים לנסוע בנתיבי תחבורה ציבורית (נת"צ).</li>
                            <li><strong>הנחה באגרת רישוי:</strong> זכאות להנחה משמעותית באגרת הרישוי השנתית לרכב.</li>
                        </ul>
                        <p>חשוב לציין כי השימוש בתו נכה מחייב אחריות ושימוש נכון, כאשר הנכה נמצא ברכב או כאשר הרכב משמש להסעתו.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        מה עושים במקרה של אובדן או נזק לתו הנכה?
                    </button>
                </h3>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        <p>במקרה של אובדן, גניבה או נזק לתו הנכה, יש לפעול באופן הבא:</p>
                        <ol>
                            <li><strong>דיווח מיידי:</strong> יש לדווח למשרד התחבורה על האובדן או הנזק בהקדם האפשרי.</li>
                            <li><strong>הגשת בקשה להחלפה:</strong> ניתן להגיש בקשה להחלפת התו דרך המערכת המקוונת של משרד התחבורה או באמצעות טופס פיזי.</li>
                            <li><strong>מסמכים נדרשים:</strong>
                                <ul>
                                    <li>טופס בקשה להחלפת תו.</li>
                                    <li>תצהיר על אובדן או גניבה (במקרה הצורך).</li>
                                    <li>צילום תעודת זהות.</li>
                                    <li>צילום רישיון רכב עדכני.</li>
                                </ul>
                            </li>
                            <li><strong>תשלום אגרה:</strong> במקרים מסוימים, ייתכן שתידרשו לשלם אגרה עבור הנפקת תו חדש.</li>
                        </ol>
                        <p>חשוב לטפל בנושא בהקדם כדי להימנע מאי-נעימויות או קנסות. עד לקבלת התו החדש, מומלץ לשמור עותק של הבקשה להחלפה ברכב.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        מה ההבדל בין סוגי תו נכה?
                    </button>
                </h3>
                <div id="collapseFive" className={`accordion-collapse collapse ${showAcc ? 'show' : ''}`} aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        <p>ההבדל העיקרי בין סוגי תו נכה הוא האם מותרת נסיעה בנתיבי תחבורה ציבורית (נת"צ):</p>
                        <ul>
                            <li><strong>תו נכה כחול עם סמל כיסא גלגלים:</strong> בעלי תו זה רשאים לנסוע בנתיבי תחבורה ציבורית (נת"צ), למעט בנתיבים המיועדים לרכבת קלה <a className='small' target='blanc' href='https://he.wikisource.org/wiki/%D7%A4%D7%A7%D7%95%D7%93%D7%AA_%D7%94%D7%AA%D7%A2%D7%91%D7%95%D7%A8%D7%94#%D7%A1%D7%A2%D7%99%D7%A3_71%D7%901'>(מקור)</a>.</li>
                            <li><strong>תו נכה רגיל (ללא סמל כיסא גלגלים):</strong> בעלי תו זה אינם רשאים לנסוע בנתיבי תחבורה ציבורית.</li>
                        </ul>
                        <p>שני סוגי התווים מעניקים זכויות חניה בחניות נכים ופטור מתשלום בחניות ציבוריות רבות. ההבדל העיקרי נוגע לזכות השימוש בנת"צ, אשר ניתנת רק לבעלי מוגבלות חמורה יותר המשתמשים בכיסא גלגלים או זקוקים לו.</p>
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingSix">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        האם תו נכה תקף גם בחו"ל?
                    </button>
                </h3>
                <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        תו נכה ישראלי אינו תקף באופן אוטומטי בחו"ל. כל מדינה יש את החוקים והתקנות שלה לגבי חניית נכים. עם זאת, במדינות מסוימות, בעיקר באיחוד האירופי, ניתן להשתמש בתו הנכה הישראלי או לבקש תו זמני מקומי. מומלץ לבדוק מראש את החוקים במדינת היעד לפני הנסיעה.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingSeven">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        האם ניתן להעביר תו נכה בין רכבים?
                    </button>
                </h3>
                <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        תו נכה מונפק לרכב ספציפי ואינו ניתן להעברה בין רכבים. אם יש ברשותכם יותר מרכב אחד, או אם החלפתם רכב, עליכם לפנות למשרד התחבורה ולבקש תו חדש עבור הרכב הנוסף או החדש. יש להגיש בקשה נפרדת לכל רכב.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingEight">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                        מה קורה אם אני מחנה בחניית נכים ללא תו?
                    </button>
                </h3>
                <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        חניה בחניית נכים ללא תו נכה תקף היא עבירה חמורה. העונש על כך כולל קנס כספי משמעותי, שעשוי להגיע לאלפי שקלים, ובמקרים מסוימים אף גרירת הרכב. בנוסף, העבירה עלולה להירשם בגיליון הרישום הפלילי של הנהג.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingNine">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                        האם תו נכה פוטר מתשלום בכל החניונים?
                    </button>
                </h3>
                <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        תו נכה אינו פוטר אוטומטית מתשלום בכל החניונים. בחניונים ציבוריים ועירוניים רבים קיים פטור, אך בחניונים פרטיים המדיניות עשויה להשתנות. חשוב לבדוק את השילוט בכניסה לחניון או לברר מראש. בנוסף, גם בחניונים עם פטור, יש להציג את תו הנכה באופן ברור.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingTen">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                        האם יש הגבלת זמן על חניה עם תו נכה?
                    </button>
                </h3>
                <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        ברוב המקרים, אין הגבלת זמן על חניה עם תו נכה בחניות המסומנות לנכים. עם זאת, במקומות מסוימים, כמו מרכזי קניות או אזורים עם ביקוש גבוה לחניה, עשויות להיות הגבלות זמן גם לבעלי תו נכה. חשוב לשים לב לשילוט המקומי ולהוראות הספציפיות בכל מקום.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingEleven">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                        מהו משך הזמן הממוצע לקבלת תשובה על בקשה לתו נכה?
                    </button>
                </h3>
                <div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        משך הזמן לקבלת תשובה על בקשה לתו נכה יכול להשתנות, אך בדרך כלל נע בין 4-8 שבועות מיום הגשת הבקשה. במקרים מורכבים או כאשר נדרשים מסמכים נוספים, התהליך עשוי להתארך.
                    </div>
                </div>
            </div>

            <div className="accordion-item">
                <h3 className="accordion-header" id="headingTwelve">
                    <button className="accordion-button collapsed bg-primary bg-opacity-10" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                        האם ניתן לערער על החלטה שלילית?
                    </button>
                </h3>
                <div id="collapseTwelve" className="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        כן, ניתן לערער על החלטה שלילית. יש להגיש ערעור בכתב תוך 45 יום מקבלת ההחלטה, בצירוף מסמכים רפואיים עדכניים המעידים על החמרה במצב או מידע חדש שלא הוצג בבקשה המקורית.
                    </div>
                </div>
            </div>
            <div className=' vh-100' />
        </div>
    );
};

export default FAQ;