import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'
import { OrderLookupPage } from '../support/pages/OrderLookupPage'

test.describe('Consulta de Pedido', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
    
        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {
        const order = {
            number: 'VLO-KZDIIB',
            status: 'APROVADO' as const,
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'Paulo R Zanette',
                email: 'zanette01@qa.com'
            },
            payment: 'À Vista'
        }

        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order.number)

        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `)

        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido reprovado', async ({ page }) => {
        const order = {
            number: 'VLO-1TFJNG',
            status: 'REPROVADO' as const,
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Paulo Marques',
                email: 'marques@gmail.com'
            },
            payment: 'À Vista'
        }
        
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order.number)
        
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `)

        await orderLookupPage.validateStatusBadge(order.status)
    })

    test('deve consultar um pedido em análise', async ({ page }) => {
        const order = {
            number: 'VLO-73S8YT',
            status: 'EM_ANALISE' as const,
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'João da Silva',
                email: 'joao@velo.dev'
            },
            payment: 'À Vista'
        }
        
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order.number)
        
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `)

        await orderLookupPage.validateStatusBadge(order.status)
    })
    
    test('deve exibir mensagem quando o pedido não for encontrado', async ({ page }) => {
        const order = generateOrderCode()
    
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.searchOrder(order)
    
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
            - img
            - heading "Pedido não encontrado" [level=3]
            - paragraph: Verifique o número do pedido e tente novamente
        `)
    })
})