import React, { useState, useEffect, ReactNode, MouseEventHandler } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Panel } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Game from './panels/Game';
import { ActivePanel } from './common';

const App = () => {
	const [activePanel, setActivePanel] = useState<ActivePanel>('game');
	const [fetchedUser, setUser] = useState<UserInfo | undefined>();
	// const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size='large' />);

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			// setPopout(null);
		}
		fetchData();
	}, []);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout> {/*popout={popout}*/ }
						<SplitCol>
							<View activePanel={activePanel}>
								<Game id='game' setActivePanel={setActivePanel} />
								<Panel id='final'>you won!</Panel>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
