export const CreateBlogForm = ({
	title,
	onTitleChange,
	author,
	onAuthorChange,
	url,
	onUrlChange,
	onSubmit,
}) => {
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<div>
						<label>
							title:{' '}
							<input type="text" value={title} onChange={onTitleChange} />
						</label>
					</div>
					<div>
						<label>
							author:{' '}
							<input type="text" value={author} onChange={onAuthorChange} />
						</label>
					</div>
					<div>
						<label>
							url: <input type="text" value={url} onChange={onUrlChange} />
						</label>
					</div>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}
