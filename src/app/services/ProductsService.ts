import { selectOffsetByPage } from '../functions';
import { IIds } from '../models/AsyncFetchModel';

export default class ProductsService {
  // Чтобы не загружать слайсы инфой, выгрузил все работы с апи сюда
  static async asyncFetchIds(page: number) {
    try {
      let hash: string | null = localStorage.getItem('password');

      const offsetAndLimit: { offset: number; limit: number } = selectOffsetByPage(page);

      const bodyGetIds = {
        action: 'get_ids',
        params: { ...offsetAndLimit },
      };

      const res = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth': `${hash}` },
        body: JSON.stringify(bodyGetIds),
      });

      const jsonIds = await res.json();
      return jsonIds;
    } catch (error) {
      return error;
    }
  }

  static async asyncFetchProducts(idsToRender: IIds, thunkAPI: any) {
    try {
      const password = localStorage.getItem('password');
      const bodyGetIds = {
        action: 'get_items',
        params: {
          ids: idsToRender.result,
        },
      };

      const res = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': `${password}`,
        },
        body: JSON.stringify(bodyGetIds),
      });

      const jsonIds = await res.json();
      return jsonIds;
    } catch (error) {
      return error;
    }
  }

  static async asyncFetchDataForFilter(filterBy: string, value: string | number, thunkAPI: any) {
    try {
      const password = localStorage.getItem('password');

      const bodyGetIds = {
        action: 'filter',
        params: { [filterBy]: value },
      };
      const res = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': `${password}`,
        },
        body: JSON.stringify(bodyGetIds),
      });

      const json = await res.json();
      // log: {result: ids[]}

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }

      return json;
    } catch (error) {}
  }
}
