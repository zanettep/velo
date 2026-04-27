import { test, expect } from '@playwright/test'

test('deve consultar um pedido aprovado', async ({ page }) => {
    const orderNumber = 'VLO-KZDIIB'
    
    await page.goto('http://localhost:5173/')

    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    await page.getByTestId('search-order-id').fill(orderNumber)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    await expect(page.getByTestId(`order-result-${orderNumber}`)).toBeVisible({timeout: 10000})

    await expect(page.getByTestId(`order-result-${orderNumber}`)).toContainText('VLO-KZDIIB')
    await expect(page.getByTestId(`order-result-${orderNumber}`)).toContainText('APROVADO')
})