import Helper from 'modules/generic/helper/Common'
export default{
    getTitle(item){
        let name = ''
        let job = ''
        if(item.account && item.account.information){
            name = Helper.getCompleteName(item.account.information)
        }
        if(item.job){
            job = item.job.title
        }
        return Helper.getFirstLetterCapitalize(job + ' - ' + name)
    },
    getCategories(categories){
        let data = categories
        if(data){
            let string = ''
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                string += item.name + (index == (data.length - 1) ? '' : ', ')
            }
            return Helper.getFirstLetterCapitalize(string)
        }
        return ''
    }
}