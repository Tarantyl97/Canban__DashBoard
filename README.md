# ТРЕБОВАНИЯ К REACT
Интерфейс должен быть поделён на компоненты. Перед началом работы хорошенько обдумайте, какие компоненты вы будете использовать. Деление на компоненты должно быть логичным и оправданным.
После того как определитесь с делением на компоненты, подумайте о том, как верно организовать файловую структуру.
Следуйте принципам модульности (используйте export, import).
Используйте Typescript для описания типов данных.
Используйте Synthetic events для работы с событиями.
Для вывода разного состояния элементов в зависимости от действий пользователя (пример: раскрытое/свернутое меню пользователя) используйте условный рендеринг.
Для реализации отдельных страниц для каждой задачи и перехода между страницами используйте библиотеку react-router.
Для ключевых React-компонентов необходимо добавить тесты.
При написании кода старайтесь следовать принципам KISS (Keep It Short and Simple — не усложняй) и DRY (Don’t Repeat Yourself — не повторяйся).

# ТРЕБОВАНИЯ К ВЁРСТКЕ И CSS
Вёрстка должна соответствовать макету. Добиваться Pixel Perfect соответствия не обязательно, но основные моменты должны быть соблюдены: цветовая гамма, шрифты, размеры, отступы.
Приложение должно корректно отображаться и на мобильных устройствах. Дизайн для мобильной версии вы можете найти в макете.
При наведении курсора на любые кликабельные элементы должен появляться cursor: pointer.
Учитывайте состояния кнопки + Add card — активная и неактивная.
Соблюдайте семантическую вёрстку. В приложении должны присутствовать разделы header, main и footer. Кнопки должна быть реализованы элементом button, элементы дропдауна — списком select и так далее.
Если кнопка активна, её внешний вид должен соответствовать макету. При наведении она должна подсвечиваться (менять цвет), а курсор должен меняться на pointer.
Если кнопка неактивна (назначен атрибут disabled), её цвет должен отличаться от активного состояния, кнопка не должна реагировать на наведение курсора (цвет остаётся таким же, не появляется курсор pointer).
Можете использовать любой вариант подключения стилей на ваше усмотрение: общий файл стилей проекта, CSS-модули или специальные React-библиотеки для стилизации компонентов (например, Styled Components).
Использовать селекторы по тегу и id для задания стилей нельзя. Используйте классы.

# REQUIREMENTS FOR REACT
The interface must be divided into components. Before you start, think carefully about which components you will use. The division into components should be logical and justified.
After you decide on the division into components, think about how to properly organize the file structure.
Follow the principles of modularity (use export, import).
Use Typescript to describe data types.
Use Synthetic events to work with events.
To display a different state of elements depending on user actions (example: expanded / collapsed user menu), use conditional rendering.
To implement separate pages for each task and navigate between pages, use the react-router library.
For key React components, you need to add tests.
When writing code, try to follow the principles of KISS (Keep It Short and Simple - do not complicate) and DRY (Don't Repeat Yourself - do not repeat yourself).
  
# LAYOUT AND CSS REQUIREMENTS
The layout must match the layout. Achieving Pixel Perfect compliance is not necessary, but the main points must be observed: colors, fonts, sizes, indents.
The application should also display correctly on mobile devices. You can find the design for the mobile version in the layout.
Follow semantic layout. The application must have <header>, <main>, and <footer> sections. Buttons should be implemented by a <button> element, dropdown elements by a <select> list, and so on.
When hovering over any clickable elements, cursor: pointer should appear.
Consider the states of the + Add card button - active and inactive.
If the button is active, its appearance should match the layout. When you hover, it should be highlighted (change color), and the cursor should change to pointer.
If the button is inactive (the disabled attribute is assigned), its color should be different from the active state, the button should not respond to hover (the color remains the same, the pointer cursor does not appear).
You can use any style connection option of your choice: a common project style file, CSS modules, or special React libraries for styling components (for example, Styled Components).
You can't use tag and id selectors to set styles. Use classes.
