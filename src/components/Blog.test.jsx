import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog>', () => {

  test('renders title and author but not url and likes', async () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "urllink",
      likes: 0,
      creator: "a2sd1f5a3s1df21asd"
    }

    const { container } = render(<Blog blog={blog} name='username' />)

    const mainInfo = await screen.findByText(`${blog.title} ${blog.author}`)
    expect(mainInfo).toBeDefined()

    const url = container.querySelector('.blogDetails')
    expect(url).toBeNull()
  })

  test('blog\'s url and likes shown when button pressed', async () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "urllink",
      likes: 0,
      creator: "a2sd1f5a3s1df21asd"
    }

    const { container } = render(<Blog blog={blog} name='username' />)

    const user = userEvent.setup()
    const show = screen.getByText('show')
    await user.click(show)

    const url = container.querySelector('.blogDetails')
    expect(url).toBeDefined()
  })

  test('pressing likes button twice calls event handler twice', async () => {
    const blog = {
      title: "Title",
      author: "Author",
      url: "urllink",
      likes: 0,
      creator: "a2sd1f5a3s1df21asd"
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} name='username' onLike={mockHandler} />)

    const user = userEvent.setup()
    const show = screen.getByText('show')
    await user.click(show)

    const like = screen.getByText('like')
    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})