<script>
	// @ts-nocheck
	import { onMount } from 'svelte'; // might use later

	export var items;
	export let out = { displayname: '' };
	export let out2 = {};
	export const exclusions = [];

	export const inputs = [
		{
			name: 'iname',
			title: 'Internal Name',
			placeholder: 'END_SWORD'
		},
		{
			name: 'txname',
			title: 'Texture Name',
			placeholder: 'texture.png'
		},
		{
			name: 'fname',
			title: 'File Name',
			placeholder: 'texture.properties'
		}
	];

	// Download file from browser
	function download(data, filename, type) {
		var file = new Blob([data], { type: type });
		if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
		else {
			// Others
			var a = document.createElement('a'),
				url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function () {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}

	// Remove minecraft formatting from string
	function displayRename(input) {
		var output = '';
		('§a' + input).split('§').forEach((part) => {
			output += part.substring(1);
		});
		return output;
	}

	// Get JSON from a URL
	async function getJSON(input) {
		const response = await fetch(input, { method: 'GET' });
		return response.json();
	}

	// Retrieve all items from NEU Item Repository
	async function findItems() {
		const response = await fetch(
			`https://api.github.com/repos/NotEnoughUpdates/NotEnoughUpdates-REPO/contents/items?ref=master`,
			{ method: 'GET' }
		);

		const data = await response.json();
		let items = { items: [], data: [], displaynames: [] };

		for (const item of data) {
			const result = await getJSON(item['download_url']);
			items.data.push(result);
			items.displaynames.push(displayRename(result['displayname']));
			items.items.push(item['name']);
		}
		return items;
	}

	onMount(() => {
		findItems().then((result) => {
			items = result;
			console.log(items);
		});
	});
</script>

<h1 class="box-inner">
	<a class="linkto" href="/">Item CIT Generator</a>
</h1>
<div class="linebreak" />
<form autocomplete="off">
	<div class="labelcontainer">
		{#each inputs as item}
			<div class="labelgroup">
				<label for={item.name}>{item.title}</label>
				<div class="linebreak" />
				<input
					class="text"
					type="text"
					name={item.name}
					id={item.name}
					placeholder={item.placeholder}
				/><br />
			</div>
		{/each}
	</div>
	<div class="linebreak" />
	<div class="labelgroup submit">
		<input
			class="submit"
			type="button"
			name="submit"
			value="Submit"
			on:click={() =>
				getJSON(
					`https://raw.githubusercontent.com/NotEnoughUpdates/NotEnoughUpdates-REPO/master/items/${
						document.getElementById('iname').value
					}.json`
				).then((result) => {
					out = result;
					let re;

					if (document.getElementById('iname').value in exclusions) {
						// if the item is excluded from standard CIT

						if (document.getElementById('txname').value) {
							// if texture exists

							re = `texture=${document.getElementById('txname').value}\ntype=item\nitems=${
								result.itemid
							}\nnbt.ExtraAttributes.id=${document.getElementById('iname').value}`;
						} else {
							// if texture does not exist

							re = `type=item\nitems=${result.itemid}\nnbt.ExtraAttributes.id=${
								document.getElementById('iname').value
							}`;
						}
					} else {
						// if the item is included in standard CIT

						if (document.getElementById('txname').value) {
							// if texture exists

							re = `texture=${document.getElementById('txname').value}\ntype=item\nitems=${
								result.itemid
							}\nnbt.ExtraAttributes.id=${document.getElementById('iname').value}`;
						} else {
							// if texture does not exist

							re = `type=item\nitems=${result.itemid}\nnbt.ExtraAttributes.id=${
								document.getElementById('iname').value
							}`;
						}
					}

					out2 = {
						// output for file editor / download
						content: re,
						fname: document.getElementById('fname').value || document.getElementById('iname').value
					};

					console.log(out2);

					// unhide download button
					document.getElementById('downloadcontainer').classList.remove('hidden');
					document.getElementById('downloadbutton').classList.remove('hidden');
				})}
		/>
	</div>
	<div class="linebreak" />
	<div class="linebreak" />
	<div class="labelgroup submit hidden" id="downloadcontainer">
		<input
			class="submit hidden"
			id="downloadbutton"
			type="button"
			name="download"
			value="Download"
			on:click={() => {
				download(out2.content, out2.fname, 'text');
				window.location.reload(); // reload page
			}}
		/>
	</div>
</form>
