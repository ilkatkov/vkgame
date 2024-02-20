# Спецификация API-запросов и ответов от фронта к бэку

### Тестовый запрос (для проверки CORS и проч.)

Request: GET /test

Response: Любой JSON

### Создание игры

Request: POST /game

Request body:

```ts
{
    logo: string,
    background: number,
    game_type: "CARDS" | "MATCHCARDS",
    cards?: {
        name: string,
        description: string
    }[],
    match_cards?: {
        image_src: string,
        name: string,
        description: string
    }[],
    theme?: {
        id: string // id подключаемой темы
    } | {
        // или создать новую тему
        filltype: "SOLID" | "GRADIENT",
        color: string,
        gradient_color?: string,
        accent_color: string
    },
    subject: string,

    // auth
    vk_id: string,
    sign: string,
}
```

Response body:

```ts
{
    status: "SUCCESS",
    game_id: number
} | {
    status: "ERROR",
    error_message: string
}
```
