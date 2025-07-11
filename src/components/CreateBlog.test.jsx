import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

describe('<CreateBlog>', () => {
  test('form submission is correct', async () => {
    const mockHandler = vi.fn()

    render(<CreateBlog onCreate={mockHandler} />)

    const user = userEvent.setup()
    const titleInput = await screen.findByText('title:')
    await user.type(titleInput.querySelector('input'), 'title')

    const authorInput = await screen.findByText('author:')
    await user.type(authorInput.querySelector('input'), 'author')

    const urlInput = await screen.findByText('url:')
    await user.type(urlInput.querySelector('input'), 'url')

    const submit = screen.getByText('create')
    await user.click(submit)
    expect(mockHandler.mock.calls[0]).toEqual(['title', 'author', 'url'])
  })
})
